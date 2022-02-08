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
		const data = await req.json();
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
	}, [quote]);
    const updateQuote = async (e) => {
        e.preventDefault();
		const req = await fetch("http://localhost:5000/api/quote", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({ quote: tempQuote }),
		});
		const data = await req.json();
        if (data.status === "ok") {
            setQuote(tempQuote)
			setTempQuote("");
			setQuote(data.quote);
		} else {
			alert(data.error);
		}
	};
	return (
		<div>
			your quote: {quote || "no quote found"} Hello Dashboard
			<form onSubmit={updateQuote}>
				<input
					type="text"
					placeholder="Quote"
					value={tempQuote}
					onChange={(e) => setTempQuote(e.target.value)}
				/>
				<input type="submit" value="Update quote" />
			</form>
		</div>
	);
};

export default Dashboard;
