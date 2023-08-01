"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  isPro,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubscription = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      disabled={loading}
      onClick={onSubscription}
      size="sm"
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="h-4 w-4 ml-2 fill-white" />}
    </Button>
  );
};
