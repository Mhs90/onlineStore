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

#-----------------get buyed------------------
@app.route("/buyed")
def getBuyed():
    conn = connectSql()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM buyed")
    resault = cursor.fetchall()
    
    buyed_list = []
    
    for row in resault:
        buyed_list.append({
            "image" : base64.b64encode(row[0]).decode("utf-8"),
            "name" : row[1],
            "email":row[2],
            "phone":row[3],
            "address":row[4],
            "price":row[5],
            "sefaresh":row[6]
        })
        
    conn.close()
    cursor.close()
        
        
    return jsonify({"buyed":buyed_list})
    
#-----------ADD product-------------
@app.route("/add", methods = ["POST"])
def addProduct():

    picture = request.files["picture"]
    image_data = picture.read()
    name = request.form["name"]
    karbord = request.form["karbord"]
    price = request.form["price"]
    
    conn = connectSql()
    cursor = conn.cursor()
    
    cursor.execute(
        """
        INSERT INTO products (picture,name,karbord,price)
        values (%s ,%s ,%s ,%s)
        """,
        (image_data , name, karbord, price)
    )
    
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return jsonify({"message": "added"})

#-----------ADD buyed-------------
@app.route("/add-buyed", methods = ["POST"])
def addBuyed():
    
    image = request.files["image"]
    image_data = image.read()
    name = request.form["name"]
    email = request.form["email"]
    phone = request.form["phone"]
    address = request.form["address"]
    price = request.form["price"]
    sefaresh = request.form["sefaresh"]
    
    
    
    conn = connectSql()
    cursor = conn.cursor()
    
    cursor.execute(
        """
        INSERT INTO buyed (image,name,email,phone,address,price,sefaresh)
        values (%s ,%s ,%s ,%s,%s ,%s, %s)
        """,
        (image_data , name, email, phone ,address ,price, sefaresh)
    )
    
    conn.commit()
    
    cursor.close()
    conn.close()
    
    return jsonify({"message": "added"})
    
# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(debug=True)