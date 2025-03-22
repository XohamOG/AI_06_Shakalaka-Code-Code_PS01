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

from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(["POST"])
def generate_avatar_response(request):
    if request.method != "POST":
        return Response({"error": "Only POST requests are allowed"}, status=405)

    text = request.data.get("text", "").strip()
    if not text:
        return Response({"error": "Text input is required"}, status=400)

    # D-ID API endpoint for talk API
    url = "https://api.d-id.com/talks"
    
    headers = {
        "Authorization": "Basic Z29vZ2xlLW9hdXRoMnwxMDg0ODM3Njg3MjU2MDQ2ODU3MzI6T3I3Yi0wOUwwSnVBb0xFN00wMVJC",
        "Content-Type": "application/json"
    }

    payload = {
        "script": {
            "type": "text",
            "input": text,
            "provider": {
                "type": "microsoft",
                "voice_id": "en-US-JennyNeural"
            }
        },
        "config": {
            "fluent": True,
            "pad_audio": 0,
            "driver_expressions": {
                "expressions": [
                    {"expression": "neutral", "intensity": 0.7}
                ]
            }
        },
        "agent_id": "agt_-WkTVsoG"
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        
        # Get the talk ID from the response
        talk_id = response.json().get("id")
        
        # Return the talk ID which can be used to fetch the result
        return Response({
            "status": "success",
            "talk_id": talk_id,
            "message": "Avatar response generation initiated"
        })

    except requests.exceptions.RequestException as e:
        return Response({
            "error": "Failed to generate avatar response",
            "details": str(e)
        }, status=500)
    
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

@api_view(["GET"])
def check_talk_status(request, talk_id):
    url = f"https://api.d-id.com/talks/{talk_id}"
    
    headers = {
        "Authorization": "Basic Z29vZ2xlLW9hdXRoMnwxMDg0ODM3Njg3MjU2MDQ2ODU3MzI6T3I3Yi0wOUwwSnVBb0xFN00wMVJC"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        return Response(response.json())
    except requests.exceptions.RequestException as e:
        return Response({
            "error": "Failed to check talk status",
            "details": str(e)
        }, status=500)
