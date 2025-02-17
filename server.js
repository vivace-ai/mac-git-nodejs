const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors()); // CORS 설정 (클라이언트와 서버가 다른 도메인일 때 필요)
app.use(bodyParser.json()); // JSON 파싱 미들웨어

// 더미 데이터 (임시 사용자 목록)
let users = [
    { id: 1, name: "김범준", age: 49 },
    { id: 2, name: "양승순", age: 51 },
];

// 모든 사용자 조회 (GET /users)
app.get("/users", (req, res) => {
    res.json(users);
});

// 특정 사용자 조회 (GET /users/:id)
app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find((u) => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
});

// 사용자 추가 (POST /users)
app.post("/users", (req, res) => {
    const { name, age } = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        age,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 사용자 수정 (PUT /users/:id)
app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, age } = req.body;
    const user = users.find((u) => u.id === userId);

    if (user) {
        user.name = name  user.name;
        user.age = age  user.age;
        res.json(user);
    } else {
        res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
});

// 사용자 삭제 (DELETE /users/:id)
app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter((u) => u.id !== userId);
    res.json({ message: "사용자가 삭제되었습니다." });
});

// 서버 실행
app.listen(port, () => {
    console.log(`✅ 서버가 실행 중입니다: http://localhost:${port}`);
});