import Link from "next/link";
import { URL } from "@/config/constants";

export const AccessTokenAlert = () => {
  return (
    <div className="space-y-4 rounded-md border border-red-500 p-4">
      <h2 className="font-semibold text-red-500">Access token required</h2>
      <p className=" text-default">
        You need to provide a GitHub access token to see your repositories. You
        can add it in the settings page.
      </p>

      <Link href={URL.SETTINGS} className="block max-w-fit text-blue underline">
        Go to settings
      </Link>
    </div>
  );
};
