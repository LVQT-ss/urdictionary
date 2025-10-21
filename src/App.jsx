import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { AuthProvider } from "./context/AuthContext";
import { VocabularyProvider } from "./context/VocabularyContext";

function App() {
  return (
    <AuthProvider>
      <VocabularyProvider>
        <RouterProvider router={router} />
      </VocabularyProvider>
    </AuthProvider>
  );
}

export default App;
