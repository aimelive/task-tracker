import React from "react";

type MenuItem = {
  url: string;
  title: string;
};

type IconProps = { active: boolean };

type SideBarITem = {
  icon: (props: IconProps) => React.JSX.Element;
} & MenuItem;

type LoginDto = { identifier: string; password: string };

type ProviderProps = {
  children: React.ChildNode;
};

type User = {
  username: string;
  email: string;
  userId: string;
};
type Task = {
  taskId: string;
  subTaskId: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};
