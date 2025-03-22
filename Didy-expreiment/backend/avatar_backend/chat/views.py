from django.shortcuts import render
import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import FAQ, Document
from .serializers import FAQSerializer, DocumentSerializer

D_ID_API_KEY = "amFpa3NkZXNhckBnbWFpbC5jb20:2Kvu_Oz56kresUrVghPSp"
OPENAI_API_KEY = "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"
D_ID_AGENT_URL = "https://studio.d-id.com/agents/share?id=agt_-WkTVsoG"  # Your agent's share URL


@api_view(["POST"])
def ask_question(request):
    user_input = request.data.get("question", "").strip()

    # Check knowledge base first
    faq = FAQ.objects.filter(question__icontains=user_input).first()
    if faq:
        return Response({"answer": faq.answer})

    # If not found, ask OpenAI
    try:
        openai_response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
            json={"model": "gpt-4", "messages": [{"role": "user", "content": user_input}]},
        ).json()

        return Response({"answer": openai_response["choices"][0]["message"]["content"]})

    except Exception as e:
        return Response({"error": "Failed to fetch response from OpenAI", "details": str(e)}, status=500)


@api_view(["POST"])
def generate_avatar_response(request):
    text = request.data.get("text", "").strip()

    # Check if text is empty
    if not text:
        return Response({"error": "Text input is required"}, status=400)

    try:
        response = requests.post(
            "https://api.d-id.com/talks/streams",
            headers={
                "Authorization": f"Bearer {D_ID_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "source_url": D_ID_AGENT_URL,  # Your D-ID agent URL
                "script": {"type": "text", "input": text},
                "voice": "en-US-Wavenet-D"  # Adjust voice settings as needed
            },
        ).json()

        if "stream_url" in response:
            return Response({"video_url": response["stream_url"]})
        else:
            return Response({"error": "Failed to generate avatar response", "details": response}, status=500)

    except Exception as e:
        return Response({"error": "D-ID API request failed", "details": str(e)}, status=500)


@api_view(["POST"])
def upload_document(request):
    serializer = DocumentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(["GET"])
def list_faqs(request):
    faqs = FAQ.objects.all()
    serializer = FAQSerializer(faqs, many=True)
    return Response(serializer.data)
