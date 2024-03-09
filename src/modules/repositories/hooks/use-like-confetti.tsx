import { useRef } from "react";

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
  isLiked: boolean;
  isUpdating: boolean;
};

export const useLikeConfetti = ({
  isLiked,
  isUpdating,
}: UseLikeConfettiProps) => {
  const controller = useRef<TConductorInstance | null>(null);

  const onInitHandler = ({ conductor }: { conductor: TConductorInstance }) => {
    controller.current = conductor;
  };

  const onShoot = () => {
    controller.current?.shoot();
  };

  const handleShoot = !isLiked && !isUpdating ? onShoot : undefined;

  return { onInitHandler, handleShoot };
};
