import React from "react";
import { Button, Card } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import BaseLayout from "./layouts/BaseLayout";

const App = () => (
  <BaseLayout>
    <Card>
      <Button type="primary">Button</Button>
      <SmileOutlined />
    </Card>
  </BaseLayout>
);

export default App;
