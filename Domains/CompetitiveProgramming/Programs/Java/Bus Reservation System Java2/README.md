# 🚌 Bus Reservation System

**Contributor:** snehal492006  

---

## 📘 Overview
A **Java Swing-based desktop application** integrated with **Oracle Database** for managing bus seat reservations.  
It allows users to **book, view, and cancel** bus tickets easily through an interactive GUI using **JDBC connectivity**.

---

## ⚙️ Features
- 📝 Reserve seats with passenger details  
- 🔍 View all reservations  
- ❌ Cancel booking by mobile number  
- 🔄 Reset form inputs  
- 💾 Connected with Oracle Database  

---

## 🧰 Technologies Used
| Component | Description |
|------------|-------------|
| **Language** | Java (Swing + JDBC) |
| **Database** | Oracle 10g / 11g |
| **Driver** | ojdbc8.jar |
| **IDE** | NetBeans / IntelliJ / Eclipse |

---

## 🗂️ Database Setup
```sql
CREATE TABLE bus_reservations (
  id NUMBER PRIMARY KEY,
  name VARCHAR2(50),
  mobile VARCHAR2(15),
  bus_number VARCHAR2(10),
  route VARCHAR2(50),
  seat_number NUMBER,
  travel_date DATE
);

CREATE SEQUENCE bus_reservations_seq START WITH 1 INCREMENT BY 1;