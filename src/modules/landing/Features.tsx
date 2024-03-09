import { BookPlusIcon } from "@/components/icons/book-plus";
import { ListChecksIcon } from "@/components/icons/list-checks";
import { MessageSquareHeartIcon } from "@/components/icons/message-square-heart";
import { SearchIcon } from "@/components/icons/search";
import { UserPlusIcon } from "@/components/icons/user-plus";
import { UserSearchIcon } from "@/components/icons/user-search";

const features = [
  {
    name: "Repository Sharing",
    description:
      "Share your GitHub repositories effortlessly with the GitShareSpace community to showcase your projects and invite collaboration.",
    icon: (props: React.SVGProps<SVGSVGElement>) => <BookPlusIcon {...props} />,
  },
  {
    name: "Discover Projects",
    description:
      "Explore a diverse range of projects shared by other developers, categorized and sorted by popularity, making it easy to find projects relevant to your interests.",
    icon: (props: React.SVGProps<SVGSVGElement>) => <SearchIcon {...props} />,
  },
  {
    name: "Like and Comment",
    description:
      "Engage with the community by liking repositories and leaving comments to provide feedback, ask questions, or express appreciation for the work of other developers.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <MessageSquareHeartIcon {...props} />
    ),
  },
  {
    name: "Follow Developers",
    description:
      "Stay updated with the latest projects and contributions from your favorite developers by following their profiles and receiving notifications for their new repositories.",
    icon: (props: React.SVGProps<SVGSVGElement>) => <UserPlusIcon {...props} />,
  },
  {
    name: "User Profiles",
    description:
      "Create personalized profiles to showcase your contributions, highlight your favorite repositories, and connect with other users within the GitShareSpace community.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <UserSearchIcon {...props} />
    ),
  },
  {
    name: "Agile Kanban Task Management",
    description:
      "Utilize our agile Kanban task management feature to streamline project workflows, visualize tasks, and track progress efficiently. Organize tasks into customizable boards, assign priorities, and collaborate effectively with team members to achieve project milestones seamlessly.",
    icon: (props: React.SVGProps<SVGSVGElement>) => (
      <ListChecksIcon {...props} />
    ),
  },
];

export const Features = () => {
  return (
    <div className="bg-layout py-24 text-default sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Discover, Share, and Connect Like Never Before
          </p>
          <p className="mt-6 text-lg leading-8 ">
            GitShareSpace offers a gateway to discovering, sharing, and
            connecting with the vibrant GitHub community. Our platform is
            dedicated to streamlining GitHub collaboration, ensuring it&apos;s
            seamless and engaging for developers worldwide. Join us in
            revolutionizing how you interact with GitHub repositories.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};
