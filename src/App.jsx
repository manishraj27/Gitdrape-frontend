import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [redirectUrl, setRedirectUrl] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const repoPath = repoUrl.replace("https://github.com/", "");
    setRedirectUrl(`/${repoPath}`);
  };

  if (redirectUrl) {
    window.location.href = redirectUrl;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">GitHub Repo Visualizer</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter GitHub Repo URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="p-2 border rounded w-80"
        />
        <button type="submit" className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">
          Visualize
        </button>
      </form>
    </div>
  );
};

const RepoViewer = () => {
  const { user, repo } = useParams();
  const [repoStructure, setRepoStructure] = useState(null);

  React.useEffect(() => {
    axios.get(`http://localhost:5000/api/repo-structure/${user}/${repo}`)
      .then((res) => setRepoStructure(res.data))
      .catch((err) => console.error(err));
  }, [user, repo]);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold">{user}/{repo} Repository</h2>
      <pre className="bg-gray-200 p-4 mt-4 rounded">
        {repoStructure ? JSON.stringify(repoStructure, null, 2) : "Loading..."}
      </pre>
    </div>
  );
};
//

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":user/:repo" element={<RepoViewer />} />
      </Routes>
    </Router>
  );
};

export default App;
