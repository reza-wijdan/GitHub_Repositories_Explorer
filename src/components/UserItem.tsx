import React from "react";
import { Icon } from "@iconify/react";

interface UserItemProps {
  username: string;
  repositories: {
    title: string;
    description: string;
    stars: number;
  }[];
}

interface UserItemState {
  expanded: boolean;
}

class UserItem extends React.Component<UserItemProps, UserItemState> {
  constructor(props: UserItemProps) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  toggleAccordion = () => {
    this.setState((prev) => ({ expanded: !prev.expanded }));
  };

  render(): React.ReactNode {
    const { username, repositories } = this.props;
    const { expanded } = this.state;

    return (
      <div className="mb-3">
        <div
          className="d-flex justify-content-between align-items-center px-3 py-2 bg-light border cursor-pointer"
          style={{ cursor: "pointer" }}
          onClick={this.toggleAccordion}
        >
          <strong>{username}</strong>
          <Icon
            icon={
              expanded
                ? "material-symbols:keyboard-arrow-up-rounded"
                : "material-symbols:keyboard-arrow-down-rounded"
            }
            width={24}
          />
        </div>

        {expanded && (
          <div className="ps-4 pt-3 pb-1">
            {repositories.map((repo, index) => (
              <div
                key={index}
                className="card bg-custom-secondary border-0 rounded-0 p-3 mb-3 shadow-sm"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fw-bold">{repo.title}</div>
                  <div className="d-flex align-items-center gap-2">
                    <span>{repo.stars}</span>
                    <Icon
                      icon="material-symbols:star-rounded"
                      width={20}
                      color="#ffbf00"
                    />
                  </div>
                </div>
                <div className="text-muted">{repo.description}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default UserItem;
