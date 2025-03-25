import React, { useState } from "react";
import { Bell, Check, X, Info, AlertTriangle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  read: boolean;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications = [
    {
      id: "1",
      title: "Project Update",
      message: "Annual Magazine project has reached 75% of its funding goal!",
      time: "10 minutes ago",
      type: "success",
      read: false,
    },
    {
      id: "2",
      title: "Contribution Received",
      message: "Your contribution of $50 to Building Fund has been received.",
      time: "2 hours ago",
      type: "info",
      read: false,
    },
    {
      id: "3",
      title: "Content Approval",
      message:
        "Your magazine article has been approved by the branch coordinator.",
      time: "1 day ago",
      type: "success",
      read: true,
    },
    {
      id: "4",
      title: "Revision Needed",
      message:
        "Please revise your testimony submission for the annual magazine.",
      time: "2 days ago",
      type: "warning",
      read: true,
    },
    {
      id: "5",
      title: "Payment Failed",
      message:
        "Your contribution to Youth Camp project could not be processed.",
      time: "3 days ago",
      type: "error",
      read: true,
    },
  ],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onDismiss = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTypeBadge = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">Warning</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
    }
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        className="relative p-2 rounded-full bg-white"
        onClick={() => setIsOpen(true)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-md bg-white shadow-lg">
      <CardHeader className="border-b bg-gray-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {unreadCount} new
              </Badge>
            )}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] w-full">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 ${notification.read ? "bg-white" : "bg-gray-50"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getTypeIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm">
                          {notification.title}
                        </h4>
                        {getTypeBadge(notification.type)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => onMarkAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={() => onDismiss(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <Bell className="h-10 w-10 text-gray-400 mb-2" />
              <h3 className="font-medium">No notifications</h3>
              <p className="text-sm text-gray-500 mt-1">
                You're all caught up!
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      {notifications.length > 0 && (
        <CardFooter className="border-t p-4 flex justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMarkAllAsRead()}
            disabled={unreadCount === 0}
          >
            Mark all as read
          </Button>
          <Button variant="link" size="sm">
            View all
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default NotificationCenter;
