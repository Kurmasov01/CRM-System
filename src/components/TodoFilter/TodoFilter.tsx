import type { TodoInfo, TodoActiveFilter } from "@/models/Models";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface Props {
  updateTodos: (activeFilter: TodoActiveFilter) => void;
  setActiveFilter: (filter: TodoActiveFilter) => void;
  todoInfo?: TodoInfo;
}

const TodoFilter: React.FC<Props> = (props) => {
  const allTodosCount: string = props.todoInfo
    ? `${props.todoInfo?.inProgress + props.todoInfo?.done}`
    : "";
    
  function onFilterChange(filter: TodoActiveFilter) {
    props.setActiveFilter(filter);
    props.updateTodos(filter);
  }

  const onChange = (key: string) => {
    onFilterChange(key as TodoActiveFilter);
  };

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: `Все (${allTodosCount})`,
    },
    {
      key: "inProgress",
      label: `В работе (${props.todoInfo?.inProgress})`,
    },
    {
      key: "done",
      label: `Сделано (${props.todoInfo?.done})`,
    },
  ];

  return <Tabs defaultActiveKey="all" items={items} onChange={onChange} />;
};

export default TodoFilter;
