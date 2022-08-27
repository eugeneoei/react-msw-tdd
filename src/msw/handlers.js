// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
    rest.get(`${process.env.REACT_APP_API}/auth`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                firstName: "Jennie",
                lastName: "Nichols",
                email: "jennie.nichols@example.com",
                avatar: "https://randomuser.me/api/portraits/thumb/men/75.jpg"
            })
        );
    })
];
