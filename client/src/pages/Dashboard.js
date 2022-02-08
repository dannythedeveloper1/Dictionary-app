import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Jwt from "jsonwebtoken";
const Dashboard = () => {
    const [quote, setQuote] = useState("");
    const [tempQuote, setTempQuote] = useState("");
	const navigate = useNavigate();
	const populateQuote = async () => {
		const req = await fetch("http://localhost:5000/api/quote", {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		});
		const data = req.json();
		if (data.status === "ok") {
			setQuote(data.quote);
		} else {
			alert(data.error);
		}
	};
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			const user = Jwt.decode(token);
			if (!user) {
				localStorage.removeItem("token");
				navigate("/login");
			} else {
				populateQuote();
			}
		}
    }, []);
    const updateQuote = async() => {
        
    }
	return (
		<div>
			your quote: {quote || "no quote found"} Hello Dashboard
			<form onSubmit={updateQuote}>
                <input
                    type="text"
                    placeholder="Quote"
                    value={tempQuote}
                    setValue={(e)=>setTempQuote(e.target.value)}
                />
				<input type="submit" value="Update quote" />
			</form>
		</div>
	);
};

export default Dashboard;
