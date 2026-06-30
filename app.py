from flask import Flask,request,jsonify
from flask_cors import CORS
import mysql.connector as sql
import base64

app = Flask(__name__)
CORS(app)

#-----------------database connection-----------------
def connectSql():
    return sql.connect(
        host='localhost',
        user='root',
        password='',
        database='mohammadstore'
    )
    
#-----------------get products------------------
@app.route("/products")
def getProducts():
    conn = connectSql()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM products")
    resault = cursor.fetchall()
    
    products_list = []
    
    for row in resault:
        products_list.append({
            "picture" : base64.b64encode(row[0]).decode("utf-8"),
            "name" : row[1],
            "karbord":row[2],
            "price":row[3]
        })
        
    conn.close()
    cursor.close()
        
        
    return jsonify({"products":products_list})
    
#-----------ADD product-------------
@app.route("/add", methods = ["POST"])
def addProduct():
    data = request.get_json() or {}
    
    picture = data["picture"]
    name = data["name"]
    karbord = data["karbord"]
    price = data["price"]
    
    conn = connectSql()
    cursor = conn.cursor()
    
    cursor.execute(
        """
        INSERT INTO products (picture,name,karbord,price)
        values (%s ,%s ,%s ,%s)
        """,
        (picture , name, karbord, price)
    )
    
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return jsonify({"message": "added"})


    
# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(debug=True)