import json
import requests
from flask import Flask, jsonify

app = Flask(__name__,
    static_url_path='', 
    static_folder='web/static',
    template_folder='web/templates')

@app.route('/')
def home():
    return app.send_static_file('index.html')

@app.route('/deck/<code>', methods=['GET'])
def fetch_deck(code):
    request1 = requests.get('https://shadowverse-portal.com/api/v1/deck/import?format=json&deck_code=' + code)
    hash_code = request1.json()['data']['hash']
    request2 = requests.get('https://shadowverse-portal.com/api/v1/deck?format=json&lang=en&hash=' + hash_code)
    raw_deck = request2.json()['data']['deck']['cards']
    return jsonify(raw_deck)