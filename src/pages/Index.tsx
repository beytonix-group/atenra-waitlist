import { useState } from "react";
import { Header } from "@/components/Header";
import { WaitlistForm } from "@/components/WaitlistForm";
import { UserTypeSelector } from "@/components/UserTypeSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, Building, Shield, Zap, Home, Truck, Heart, Briefcase, Code } from "lucide-react";

type UserType = "client" | "business";

const Index = () => {
  const [userType, setUserType] = useState<UserType>("client");

  const emailSubject = encodeURIComponent("Atenra Waitlist Interest");
  const emailBody = encodeURIComponent(
    "Hi Atenra Team,\n\nI'm interested in joining the waitlist for Atenra.\n\nName:\nBusiness Name (if applicable):\nPhone:\n\nPlease add me to your list!\n\nBest regards"
  );

  const industries = [
    { icon: Home, name: "Home & Maintenance", services: "Plumbing, Electrical, Carpentry, Landscaping, Renovation" },
    { icon: Truck, name: "Logistics & Transport", services: "Moving, Courier, Freight, Auto Transport, Storage" },
    { icon: Heart, name: "Wellness & Health", services: "Fitness, Therapy, Nutrition, Home Care, Spa & Recovery" },
    { icon: Briefcase, name: "Professional Services", services: "Accounting, Legal, Consulting, Marketing, Admin Support" },
    { icon: Code, name: "Tech & Creative", services: "Web Development, Design, Photography, IT Services, Software" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Toggle + Form */}
      <section className="relative pt-20 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 hero-gradient hidden sm:block" />
        <div className="absolute top-20 sm:top-40 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-gradient-radial from-muted/50 to-transparent rounded-full blur-3xl opacity-60 animate-float" />
        
      {/* About Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <img 
            src="data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20id%3D%22Vertical%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%202230.75%201283.92%22%3E%3Cdefs%3E%3Cstyle%3E%20%20%20%20%20%20.cls-1%20%7B%20%20%20%20%20%20%20%20fill%3A%20%231e95ad%3B%20%20%20%20%20%20%7D%20%20%20%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M702.23%2C965.91l7.65-39.62h-124.08v-102.88l-74.72%2C12.51-2.78%2C45.87c-.69%2C14.37-3.77%2C25.08-9.21%2C32.15-5.45%2C7.07-12.81%2C12.16-22.07%2C15.29-9.27%2C3.13-20.16%2C5.97-32.67%2C8.52v28.15h56.65v244.33c0%2C15.06%2C4.57%2C27.98%2C13.73%2C38.75%2C9.15%2C10.77%2C21.43%2C19.01%2C36.84%2C24.68%2C15.4%2C5.67%2C32.61%2C8.51%2C51.61%2C8.51%2C15.52%2C0%2C30.24-2.08%2C44.14-6.25%2C13.9-4.17%2C26.12-8.74%2C36.67-13.73%2C10.54-4.98%2C18.25-8.98%2C23.11-11.99v-25.02h-9.04c-4.87%2C1.62-11.94%2C3.36-21.2%2C5.21-9.27%2C1.86-17.72%2C2.78-25.37%2C2.78-7.18%2C0-15.99-1.62-26.41-4.87-10.43-3.24-19.58-8.11-27.46-14.6-7.88-6.48-11.82-14.6-11.82-24.33v-223.48h116.43Z%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M1054.91%2C1079.06c.25-4.79.49-9.59.74-14.62.25-5.04.37-8.85.37-11.55%2C0-23.72-5.78-46.08-17.33-67.1-11.67-21.14-28.39-38.22-50.51-51.25-22-13.15-48.79-19.66-80.62-19.66-35.76%2C0-66.98%2C8.6-93.03%2C25.68-26.3%2C17.08-46.45%2C39.82-60.71%2C68.08-14.26%2C28.39-21.38%2C59.36-21.38%2C93.15%2C0%2C39.45%2C7.37%2C72.63%2C22.12%2C99.79%2C14.75%2C27.04%2C35.02%2C47.68%2C61.2%2C61.45%2C25.93%2C14.01%2C55.92%2C20.89%2C89.34%2C20.89%2C31.22%2C0%2C59.73-6.39%2C86.15-18.93%2C26.18-12.66%2C47.68-25.68%2C64.03-39.08v-31.95h-9.34c-6.88%2C4.3-15.48%2C9.34-25.93%2C15.12-10.2%2C5.65-22.12%2C10.45-35.64%2C14.62-13.4%2C3.93-28.63%2C6.02-45.84%2C6.02-30.11%2C0-53.83-6.39-71.03-19.17-17.33-12.66-29.49-29.99-36.5-51.86-6.64-20.65-10.08-43.63-10.45-68.7h233.13c.37-2.58.74-6.27%2C1.23-10.94ZM821.91%2C1056.57c.62-6.02%2C1.23-12.17%2C2.21-18.19%2C2.33-15.98%2C6.51-30.48%2C12.54-43.87%2C6.02-13.27%2C14.5-23.96%2C25.07-32.07%2C10.69-8.11%2C24.09-12.17%2C40.31-12.17s29.86%2C4.67%2C39.57%2C13.89c9.58%2C9.34%2C16.34%2C21.88%2C20.4%2C37.85%2C4.06%2C15.98%2C6.14%2C34.16%2C6.14%2C54.56h-146.24Z%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M1466.14%2C1234.4c-3.01-3.13-4.52-7.47-4.52-13.03v-184.21c0-28.96-4.99-52.42-14.94-70.38-9.96-17.95-23.46-31.11-40.49-39.45-17.03-8.34-36.09-12.51-57.17-12.51-12.51%2C0-25.14%2C1.39-37.88%2C4.17-12.75%2C2.78-25.49%2C8.46-38.23%2C17.03-12.74%2C8.58-25.49%2C21.67-38.23%2C39.28h-1.74v-57.7l-134.5%2C23.64v19.12l34.06%2C13.21c6.48%2C2.32%2C11.29%2C5.27%2C14.42%2C8.86%2C3.13%2C3.6%2C4.7%2C8.29%2C4.7%2C14.08v226.26c0%2C4.87-1.45%2C8.86-4.35%2C11.99-2.9%2C3.13-6.55%2C5.38-10.95%2C6.78l-37.88%2C12.16v22.24h182.81v-22.24l-29.89-12.16c-4.17-1.85-7.71-4.17-10.6-6.95-2.9-2.78-4.35-6.72-4.35-11.82v-221.04c9.27-13.21%2C20.73-21.78%2C34.41-25.72%2C13.67-3.94%2C26.76-5.91%2C39.27-5.91%2C19%2C0%2C33.25%2C3.82%2C42.75%2C11.47%2C9.5%2C7.65%2C15.87%2C18.83%2C19.12%2C33.54%2C3.24%2C14.72%2C4.87%2C32.49%2C4.87%2C53.35v152.93c0%2C5.56-1.45%2C9.91-4.35%2C13.03-2.9%2C3.13-6.43%2C5.51-10.6%2C7.13l-34.06%2C12.16v22.24h182.47v-22.24l-33.37-12.16c-4.17-1.62-7.77-4-10.77-7.13Z%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M1786.23%2C914.82c-15.76%2C0-29.89%2C3.53-42.4%2C10.6-12.51%2C7.07-23.98%2C16.63-34.41%2C28.67-10.43%2C12.05-20.51%2C25.72-30.24%2C41.01h-1.39v-77.51l-136.24%2C23.64v19.12l36.84%2C13.9c6.95%2C2.32%2C11.82%2C5.56%2C14.6%2C9.73%2C2.78%2C4.17%2C4.17%2C9.73%2C4.17%2C16.68v222.09c0%2C4.87-1.39%2C8.86-4.17%2C11.99-2.78%2C3.13-6.37%2C5.38-10.77%2C6.78l-38.58%2C12.16v22.24h200.88v-22.24l-47.27-12.16c-10.19-2.55-15.29-8.81-15.29-18.77v-199.15c7.65-9.5%2C15.29-17.14%2C22.94-22.94%2C7.65-5.79%2C15.69-10.08%2C24.16-12.86%2C8.46-2.78%2C17.55-4.17%2C27.28-4.17%2C7.41%2C0%2C14.89%2C1.62%2C22.42%2C4.87%2C7.53%2C3.25%2C12.34%2C7.07%2C14.43%2C11.47l12.16%2C26.76h37.88v-98.36c-8.57-4.4-17.09-7.76-25.54-10.08-8.46-2.31-18.94-3.47-31.45-3.47Z%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M2223.86%2C1228.01c-5.16%2C1.6-10.81%2C2.95-17.08%2C4.3-6.27%2C1.23-10.94%2C1.97-14.26%2C1.97-8.73%2C0-15.98-2.33-21.14-7-5.41-4.67-8.11-10.69-8.11-18.07l1.84-180.41c.24-29.49-6.76-52.47-20.52-68.94-14.01-16.59-31.58-28.27-52.84-35.02-21.38-6.64-43.01-9.95-65.01-9.95-19.54%2C0-37.36%2C1.35-53.7%2C4.42-16.35%2C2.95-31.34%2C6.88-44.98%2C11.55-13.76%2C4.67-26.3%2C9.46-37.97%2C14.62l8.72%2C69.07h13.64c6.51-4.18%2C14.13-9.46%2C23.23-15.98%2C8.97-6.51%2C18.8-12.9%2C29.37-19.29%2C10.57-6.39%2C21.26-11.67%2C32.07-15.73%2C10.94-4.3%2C21.63-6.27%2C31.95-6.27%2C18.06%2C0%2C31.34%2C4.3%2C39.33%2C13.15%2C8.11%2C8.85%2C12.04%2C24.95%2C11.8%2C48.3l-.25%2C49.4c-3.07%2C0-7.99-.37-14.62-.86-6.76-.61-13.4-1.11-19.79-1.84-6.51-.49-11.31-.74-14.25-.74-16.22%2C0-33.92%2C2.09-52.84%2C6.51-19.05%2C4.42-37.11%2C11.31-54.07%2C20.89-17.08%2C9.59-30.97%2C21.87-42.03%2C37.36-10.94%2C15.36-16.59%2C34.29-16.59%2C56.41%2C0%2C17.08%2C4.05%2C32.81%2C12.04%2C47.56%2C7.99%2C14.62%2C19.29%2C26.67%2C33.8%2C35.76%2C14.75%2C9.22%2C31.83%2C13.76%2C51.25%2C13.76%2C11.06%2C0%2C23.47-1.35%2C37.11-3.93%2C13.64-2.58%2C27.53-7.99%2C41.54-16.47%2C14.13-8.36%2C26.67-21.38%2C38.09-38.83h2.09c0%2C21.87%2C6.02%2C37.11%2C18.19%2C45.96%2C12.17%2C8.85%2C29%2C13.27%2C50.63%2C13.27%2C9.46%2C0%2C19.54-1.84%2C29.99-5.28%2C10.57-3.44%2C20.4-7.62%2C29.62-12.17%2C9.09-4.67%2C15.98-8.73%2C20.65-12.17v-25.32h-6.88ZM2079.22%2C1198.02c-8.11%2C12.29-18.68%2C20.89-32.07%2C25.93-13.15%2C5.04-25.69%2C7.5-37.48%2C7.5-8.36%2C0-16.71-1.72-25.19-5.28-8.36-3.69-15.48-9.83-21.14-18.68-5.65-8.85-8.6-20.89-8.6-36.25%2C0-18.31%2C5.16-32.81%2C15.48-43.75%2C10.32-10.94%2C24.82-18.68%2C43.63-23.35%2C18.8-4.92%2C40.8-7.25%2C66.11-7.25l-.74%2C101.14Z%22%2F%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M410.95%2C1240.41c-3.07-1.11-6.14-3.2-8.85-5.9%2C1.85-9.71%2C3.2-21.75%2C4.18-34.16v-1.35c8.6-120.68-33.06-237.43-96.96-337.83-12.04-18.8-24.95-37.11-39.2-54.2-2.09-2.46-6.39-8.48-11.43-14.75h-65.99c-68.7%2C72.88-148.45%2C231.16-148.45%2C410.34%2C0%2C9.59.37%2C19.29.74%2C29.25-3.32%2C3.56-7.5%2C6.39-12.41%2C8.11l-32.57%2C12.9v23.1h153.25v-23.1l-50.88-22.49c-5.41-36.5-5.9-80.49%2C3.32-124h210.02c2.7%2C24.21%2C3.44%2C48.54%2C1.47%2C72.01-1.35%2C10.69-3.2%2C21.26-5.53%2C31.83-3.69%2C16.1-16.35%2C29-32.45%2C33.18l-34.41%2C9.46v23.1h199.95v-23.1l-33.8-12.41ZM116.01%2C1064.8c33.43-145.14%2C96.22-219.61%2C96.22-219.61%2C81.85%2C103.48%2C97.09%2C219.61%2C97.09%2C219.61H116.01Z%22%2F%3E%3C%2Fg%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M1544.7%2C526.21c14.11-14.92%2C26.35-28.34%2C37.21-38.7-9.41-5.19-20.63-12.65-33.68-21.49-14.04-9.52-30.16-20.61-48.21-32.09l-1.04-.66.27-1.21c5.18-23.46%2C7.77-47.49%2C7.77-71.96%2C0-94.71-39.56-183.93-111.58-251.62-35.86-33.7-77.92-60.2-124.89-78.93h0C1221.66%2C10.12%2C1169.02.18%2C1115.51%2C0h-.14s-.14%2C0-.14%2C0c-53.51.18-106.15%2C10.11-155.04%2C29.53h0c-46.97%2C18.73-89.03%2C45.23-124.89%2C78.93-72.01%2C67.7-111.57%2C156.92-111.58%2C251.62%2C0%2C24.47%2C2.59%2C48.51%2C7.77%2C71.96l.27%2C1.21-1.04.66c-18.05%2C11.48-34.17%2C22.57-48.21%2C32.09-13.05%2C8.84-24.28%2C16.3-33.68%2C21.49%2C10.86%2C10.36%2C23.1%2C23.78%2C37.21%2C38.7%2C14.88%2C15.73%2C31.82%2C33.13%2C51.34%2C50.31%2C39.05%2C34.36%2C88.4%2C67.86%2C152.17%2C85.57l13.87%2C3.84-14.39-.37c-28-.73-62.56-7.05-90.19-13.17-21.31-4.73-38.45-9.34-45.19-11.2%2C17.01%2C57.03%2C36.67%2C83.5%2C39.72%2C87.37%2C17.85%2C2.73%2C35.03%2C3.98%2C51.5%2C3.98%2C79.13%2C0%2C142.07-28.58%2C185.31-57.25%2C38.17-25.31%2C60.95-50.66%2C65.87-56.39-.02-.03-.04-.05-.07-.08-.69-.77-1.63-1.84-2.77-3.16-2.26-2.62-5.26-6.17-8.39-9.89-6.26-7.45-12.99-15.59-15.27-18.47-.31-.39-.53-.68-.69-.9-9.81-13.58-18.36-27.4-25.03-42.82-13.66-31.59-24.9-64.57-29.76-98.88-1.6-11.3-2.42-22.5-2.42-33.55%2C0-40.25%2C10.91-78.59%2C34.63-112.95%2C18.8-27.24%2C42.12-52.32%2C67.99-73.02l1.1-.88%2C1.1.88c25.88%2C20.7%2C49.2%2C45.78%2C67.99%2C73.02%2C23.72%2C34.36%2C34.63%2C72.71%2C34.63%2C112.95%2C0%2C11.05-.82%2C22.25-2.42%2C33.55-4.86%2C34.31-16.1%2C67.29-29.76%2C98.88-6.67%2C15.42-15.22%2C29.24-25.03%2C42.82-.26.36-.71.93-1.38%2C1.76-.66.82-1.52%2C1.88-2.52%2C3.09-2%2C2.44-4.57%2C5.54-7.29%2C8.8-5.44%2C6.53-11.47%2C13.68-14.73%2C17.39-.5.57-.92%2C1.04-1.28%2C1.44.72.84%2C1.82%2C2.09%2C3.3%2C3.71%2C2.87%2C3.14%2C7.14%2C7.63%2C12.77%2C13.01%2C11.26%2C10.77%2C27.93%2C25.14%2C49.55%2C39.5%2C43.25%2C28.73%2C106.28%2C57.42%2C185.57%2C57.42%2C16.47%2C0%2C33.65-1.25%2C51.5-3.98.15-.19.32-.41.54-.7.64-.84%2C1.57-2.12%2C2.76-3.86%2C2.38-3.48%2C5.75-8.82%2C9.72-16.17%2C7.68-14.23%2C17.57-36.05%2C26.69-66.64-6.74%2C1.87-23.89%2C6.48-45.19%2C11.2-27.62%2C6.12-62.19%2C12.44-90.19%2C13.17l-14.31.36%2C13.8-3.83c95.64-26.55%2C158.88-88.67%2C203.51-135.87ZM1006.42%2C636.18c-.25%2C0-.41-.04-.55-.07-.14-.03-.25-.07-.36-.11-.22-.08-.42-.16-.65-.26-.4-.17-.88-.4-1.42-.64-44.67-6.99-92.93-30.32-134.59-56.22-41.74-25.96-76.8-54.5-94.87-71.98l-1.6-1.55%2C1.87-1.2c27.69-17.83%2C59.04-35.83%2C93.63-49.49%2C12.5-4.94%2C25.44-9.3%2C38.82-12.94h.02c9-2.33%2C18.02-4.37%2C27.34-5.97l1.97-.34.1%2C2c.57%2C12.06%2C2.15%2C24.27%2C4.59%2C36.19h0c9.83%2C49.01%2C23.35%2C103.89%2C67.08%2C159.72l2.24%2C2.85h-3.63ZM1115.4%2C125.26l-.03.03-.02-.03c-12.01%2C13.44-69.84%2C79.08-120.74%2C139.45-21.55%2C25.57-37.5%2C54.88-47.27%2C86.2l-.35%2C1.13-1.18.11c-32.39%2C2.88-62.78%2C10.08-91.17%2C19.88l-2.16.75-.17-2.28c-.29-3.8-.44-7.31-.44-10.41%2C0-78.19%2C29.43-154.27%2C77.05-210.95%2C47.61-56.66%2C113.52-93.95%2C186.45-94.22h.01c72.93.27%2C138.83%2C37.56%2C186.45%2C94.22%2C47.62%2C56.67%2C77.04%2C132.76%2C77.05%2C210.95%2C0%2C3.09-.15%2C6.61-.44%2C10.41l-.18%2C2.28-2.16-.75c-28.39-9.8-58.77-17-91.17-19.88l-1.18-.11-.35-1.13c-9.77-31.32-25.71-60.62-47.26-86.2-50.9-60.38-108.74-126.03-120.74-139.46ZM1226.05%2C635.67c-.43.18-.73.33-1.18.44-.14.03-.29.07-.55.07h-3.63l2.24-2.85c43.74-55.83%2C57.25-110.72%2C67.08-159.72h0c2.44-11.93%2C4.02-24.14%2C4.59-36.2l.09-1.99%2C1.97.34c9.32%2C1.6%2C18.34%2C3.64%2C27.34%2C5.96h.02c13.38%2C3.64%2C26.32%2C8%2C38.82%2C12.94%2C34.59%2C13.66%2C65.94%2C31.66%2C93.63%2C49.5l1.87%2C1.2-1.6%2C1.55c-18.06%2C17.48-53.13%2C46.02-94.87%2C71.98-41.66%2C25.9-89.92%2C49.22-134.59%2C56.22-.47.21-.89.4-1.25.56Z%22%2F%3E%3C%2Fsvg%3E" 
            alt="Atenra Logo" 
            className="max-w-md mx-auto h-32 mb-4 animate-fade-in"
          />
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">
            Your Personal & Business Assistant, On Demand
          </p>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover trusted professionals through intelligent matching — where technology meets genuine human insight.
          </p>
          <p className="text-base text-foreground/80 max-w-2xl mx-auto mt-4">
            At Atenra, every connection is <strong>hand-verified</strong>, thoughtfully matched, and designed to make your life easier.
          </p>
        </div>
      </section>

        <div className="w-full px-4 sm:px-0 max-w-lg mx-auto relative z-10">
          {/* User Type Selector - First Thing Centered */}
          <div className="mb-6 sm:mb-8 animate-fade-in">
            <UserTypeSelector value={userType} onChange={setUserType} />
          </div>

          {/* Waitlist Form directly under toggle */}
          <Card className="glass-card animate-fade-in w-full" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="text-center pb-4 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">
                {userType === "client" ? "Get Started" : "Partner With Us"}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                {userType === "client"
                  ? "Join our waitlist to find trusted professionals"
                  : "Join our waitlist to grow your customer base"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5">
              <WaitlistForm userType={userType} />
              
              {/* Email Alternative */}
              <div className="pt-3 sm:pt-4 border-t border-border">
                <p className="text-xs sm:text-sm text-muted-foreground text-center mb-2 sm:mb-3">
                  Prefer email instead?
                </p>
                <Button variant="secondary" className="w-full gap-2 h-10 sm:h-12 text-sm sm:text-base" asChild>
                  <a href={`mailto:contact@atenra.com?subject=${emailSubject}&body=${emailBody}`}>
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    Email Us Directly
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      {/* Stats */}
      <section className="py-8 px-4 sm:px-8 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="text-center p-4 sm:p-6 rounded-xl bg-muted/30">
              <Users className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-lg">1000+</p>
              <p className="text-sm text-muted-foreground">Verified Professionals</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-muted/30">
              <Building className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-lg">20+</p>
              <p className="text-sm text-muted-foreground">Service Categories</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-muted/30">
              <Shield className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-lg">100%</p>
              <p className="text-sm text-muted-foreground">Hand-Verified</p>
            </div>
            <div className="text-center p-4 sm:p-6 rounded-xl bg-muted/30">
              <Zap className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
              <p className="font-semibold text-lg">24/7</p>
              <p className="text-sm text-muted-foreground">Support Ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-3">Industries We Serve</h2>
          <p className="text-muted-foreground text-center mb-8">
            Connect with verified professionals across multiple industries
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="p-5 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <industry.icon className="w-8 h-8 mb-3 text-muted-foreground" />
                <h3 className="font-semibold mb-2">{industry.name}</h3>
                <p className="text-sm text-muted-foreground">{industry.services}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 px-4 sm:px-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Atenra. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
