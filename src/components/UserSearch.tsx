import React from "react";
import ApiSystem from "../system/api_github/api";
import UserItem from "./UserItem";

class UserSearch extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      list_user: [],
      query: "",
      loading: false,
      error: "",
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  async handleSearch() {
    const { query } = this.state;
    if (!query) return;

    this.setState({ loading: true, list_user: [], error: "" });

    try {
      const result = await ApiSystem.searchUser(query);
      console.log(result)
      const users = result.items || [];

      const userWithRepos = await Promise.all(
        users.map(async (user: any) => {
          const repos = await ApiSystem.getUserRepo(user.login);
          return {
            username: user.login,
            repositories: repos.map((repo: any) => ({
              title: repo.name,
              description: repo.description || "-",
              stars: repo.stargazers_count,
            })),
          };
        })
      );

      this.setState({ list_user: userWithRepos });
    } catch (err: any) {
      console.error(err);
      this.setState({ error: "Failed to fetch users or repositories" });
    } finally {
      this.setState({ loading: false });
    }
  }

  render(): React.ReactNode {
    const { query, loading, list_user, error } = this.state;

    return (
      <>
        <input
          type="text"
          className="form-control mb-2 w-100 bg-light-secondary h-24"
          placeholder="Enter username"
          value={query}
          onChange={this.handleInputChange}
        />
        <button
          type="button"
          className="btn button-primary-custom w-100"
          disabled={loading}
          onClick={this.handleSearch}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        {error && <div className="text-danger mt-2">{error}</div>}

        {list_user.length > 0 && (
          <p className="text-secondary mt-3">
            Showing users for "<strong>{query}</strong>"
          </p>
        )}

        {list_user.map((user: any, idx: number) => (
          <UserItem key={idx} username={user.username} repositories={user.repositories} />
        ))}
      </>
    );
  }
}

export default UserSearch;
