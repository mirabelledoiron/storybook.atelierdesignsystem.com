import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./styles/variables.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
