const { DataTypes } = require("sequelize");
const sequelize = require("./db");

// Define the Store model
const Store = sequelize.define("store", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    adminId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "users",
            key: "id",
        },
    },
    address: {
        type: DataTypes.STRING, // ประเภทข้อมูลเป็นข้อความ
        allowNull: false, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
        unique: true, // กำหนดให้ที่อยู่มีค่าไม่ซ้ำกัน
    },
    latitude: {
        type: DataTypes.FLOAT, // เก็บตัวเลขแบบทศนิยม
        allowNull: true, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
    },
    longitude: {
        type: DataTypes.FLOAT, // เก็บตัวเลขแบบทศนิยม
        allowNull: true, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
    },
    deliveryRadius: {
        type: DataTypes.FLOAT, // เก็บตัวเลขแบบทศนิยม
        allowNull: true, // ไม่อนุญาตให้ค่านี้เป็นค่าว่าง
    },
});

// Synchronize the model with the database
Store.sync({ alter: false }) // Use { alter: true } to update existing table structure
    .then(() => {
        console.log("Store table created or updated");
    })
    .catch((error) => {
        console.log("Error creating or updating Store table:", error);
    });

module.exports = Store;
