import { useRef } from "react";
import type { User } from "@/config/types/prisma.type";

type TRunAnimationParams = {
  speed: number;
  duration?: number;
  delay?: number;
};

type TConductorInstance = {
  run: (params: TRunAnimationParams) => void;
  shoot: () => void;
  pause: () => void;
  stop: () => void;
};

type UseLikeConfettiProps = {
  user: User | null;
  isLiked: boolean;
  isPending: boolean;
};

export const useLikeConfetti = ({
  user,
  isLiked,
  isPending,
}: UseLikeConfettiProps) => {
  const controller = useRef<TConductorInstance | null>(null);

  const onInitHandler = ({ conductor }: { conductor: TConductorInstance }) => {
    if (user) {
      controller.current = conductor;
    } else {
      console.log("User is not defined");
    }
  };

  const onShoot = () => {
    controller.current?.shoot();
  };

  const handleShoot = !isLiked && !isPending ? onShoot : undefined;

  return { onInitHandler, handleShoot };
};
