from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET'])
def get_bfhl():
    response = {
        "operation_code": 1
    }
    return jsonify(response), 200

@app.route('/bfhl', methods=['POST'])
def post_bfhl():
    try:
        data = request.json.get('data', [])
        user_id = "john_doe_17091999"
        email = "john@xyz.com"
        roll_number = "ABCD123"

        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        highest_alphabet = max(alphabets, key=str.lower) if alphabets else None

        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": [highest_alphabet] if highest_alphabet else []
        }
        return jsonify(response), 200
    except Exception as e:
        response = {
            "is_success": False,
            "error": str(e)
        }
        return jsonify(response), 400

if __name__ == '__main__':
    app.run(debug=True)
