import React, { useState } from "react";
import { Calendar, Typography, Card, List, Modal, Badge } from "antd";
import { ScheduleOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Title, Text } = Typography;

const FitnessCalendar = () => {
  // Pre-defined fitness events
  const fitnessEvents = [
    { date: "2025-02-28", event: "Morning Yoga Session (7:00 AM)" },
    { date: "2025-03-01", event: "10,000 Steps Challenge" },
    { date: "2025-03-01", event: "Evening Zumba Dance (6:00 PM)" },
    { date: "2025-03-02", event: "Upper Body Strength Workout" },
    { date: "2025-03-03", event: "Cardio Blast (20 minutes)" },
    { date: "2025-03-04", event: "Rest Day - Stretch and Meditate" },
    { date: "2025-03-05", event: "Leg Day Workout" },
    { date: "2025-03-06", event: "Full Body HIIT Session" },
  ];

  // State for selected date
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle date selection
  const onDateSelect = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setIsModalVisible(true);
  };

  // Get events for the selected date
  const eventsForSelectedDate = fitnessEvents.filter(
    (event) => event.date === selectedDate
  );

  // Render custom date cells
  const dateCellRender = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const matchingEvents = fitnessEvents.filter(
      (event) => event.date === formattedDate
    );

    if (matchingEvents.length > 0) {
      return (
        <div
          style={{
            backgroundColor: "#fffbe6",
            borderRadius: "8px",
            padding: "5px",
            border: "1px solid #faad14",
          }}
        >
          <Text strong style={{ color: "#faad14", fontSize: "12px" }}>
            <ScheduleOutlined style={{ marginRight: "5px" }} />
            {matchingEvents.length} Event{matchingEvents.length > 1 ? "s" : ""}
          </Text>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{ maxWidth: "900px", margin: "20px auto", padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Fitness Calendar
      </Title>
      <Card bordered style={{ padding: "20px" }}>
        <Calendar
          fullscreen={false}
          dateCellRender={dateCellRender}
          onSelect={onDateSelect}
        />
      </Card>

      <Modal
        title={`Events on ${selectedDate}`}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {eventsForSelectedDate.length > 0 ? (
          <List
            dataSource={eventsForSelectedDate}
            renderItem={(event) => (
              <List.Item>
                <Badge
                  color="gold"
                  text={event.event}
                  style={{ fontSize: "14px" }}
                />
              </List.Item>
            )}
          />
        ) : (
          <Text>No events for this day.</Text>
        )}
      </Modal>
    </div>
  );
};

export default FitnessCalendar;
