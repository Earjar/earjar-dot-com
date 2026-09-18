import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import {Home} from "../views/index.ts";

export default function RouteProvider() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/*" element={<Navigate to="/home" />} />
            </Routes>
        </Router>
    );
};