from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db=client["todo"]
collection=db["tasks"]

@app.route('/', methods=["GET"])
def get_all():
    tasks=list(collection.find({}, {"_id":  0}))
    return jsonify(tasks)

@app.route('/add', methods=["POST"])
def add_task():
    task=request.json
    collection.insert_one(task)
    return jsonify({"message": "Task added"})

@app.route('/delete/<task_name>', methods=["DELETE"])
def deleteTask(task_name):
    # task=request.json
    collection.delete_one({"task": task_name})
    return jsonify({"message": "Task deleted"})

@app.route("/update/<task_name>", methods=["PUT"])
def update_task(task_name):
    task=request.json
    collection.update_one({"task": task_name}, {"$set": task})
    return jsonify({"message": "task updated"})

if __name__ == "__main__":
    app.run(debug=True)