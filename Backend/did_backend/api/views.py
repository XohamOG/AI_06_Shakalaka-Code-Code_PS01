import requests
import base64
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# 🔴 Hardcoded API Key (Ensure this is kept secure in production)
D_ID_API_KEY = "MjAyMy5zb2hhbS5wYXRpbEB2ZXMuYWMuaW4:VYdyQkAhPq1cjxhKOBlG-"
AGENT_ID = "agt_cSWYN6Bt"

# 🔑 Encode API Key for Basic Auth
encoded_auth = base64.b64encode(D_ID_API_KEY.encode()).decode()

@csrf_exempt
def get_agent_details(request):
    url = f"https://api.d-id.com/agents/{AGENT_ID}"
    headers = {
        "Authorization": f"Basic {encoded_auth}",  # ✅ Correct Basic Auth method
        "Content-Type": "application/json",
    }

    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 401:
            return JsonResponse({"error": "Unauthorized. Check your API key."}, status=401)
        return JsonResponse(response.json(), status=response.status_code, safe=False)
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)}, status=500)
