"use client";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import "./tasktrading.css";
import TaskBanner from "@/components/sections/task/TaskBanner";

export default function TaskTradings() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <TaskBanner />
        </div>
      </Layout>
    </>
  );
}
