import type { TodoInfo, TodoActiveFilter } from "@/models/Models";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface Props {
  updateTodos: (activeFilter: TodoActiveFilter) => void;
  setActiveFilter: (filter: TodoActiveFilter) => void;
  todoInfo?: TodoInfo;
}

const TodoFilter: React.FC<Props> = (props) => {
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
      label: `Все (${props.todoInfo?.all})`,
    },
    {
      key: "inWork",
      label: `В работе (${props.todoInfo?.inWork})`,
    },
    {
      key: "completed",
      label: `Сделано (${props.todoInfo?.completed})`,
    },
  ];

  return <Tabs defaultActiveKey="all" items={items} onChange={onChange} />;
};

export default TodoFilter;
