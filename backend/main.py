from flask import request, jsonify
from config import app
import requests
import os
from dotenv import load_dotenv
from flask_cors import CORS

CORS(app)

load_dotenv()

api_key = os.getenv("bigpicture_api_key")

@app.route('/api/domain', methods=['GET'])
def get_company_domain():
    domain = request.args.get("domain")
    if not domain:
        return jsonify({'error' : 'Domain name is required'}), 400

    headers = {
        "Authorization" : f"Bearer {api_key}"
    }

    url = f"https://company.bigpicture.io/v1/companies/find/stream?domain={domain}"

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        data = response.json()
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/name', methods=['GET'])
def get_company_name():
    name = request.args.get("name")
    if not name:
        return jsonify({"Error" : "Company name is required"}), 400
    headers = {
        "Authorization" : f"Bearer {api_key}"
    }
    url = f"https://company.bigpicture.io/v1/companies/find/stream?domain={name}.com"
    try:
        response = requests.get(url, headers=headers) 
        response.raise_for_status()
        data = response.json()
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)