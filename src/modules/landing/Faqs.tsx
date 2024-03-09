"use client";
import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What is GitshareSpace?",
    answer:
      "GitshareSpace is a platform designed to enhance collaboration and discovery within the GitHub community. It allows users to share, explore, and interact with GitHub repositories in a social networking environment.",
  },
  {
    question: "How does GitshareSpace work?",
    answer:
      "GitshareSpace syncs GitHub data to provide users with a personalized experience. Users can add repositories, like and comment on them, and connect with others who share similar interests.",
  },
  {
    question: "Can I add my own repositories to GitshareSpace?",
    answer:
      "Yes, absolutely! GitshareSpace allows users to add their own repositories to share with the community and gain visibility for their projects.",
  },
  {
    question: "Is GitshareSpace open-source?",
    answer:
      " Absolutely! GitshareSpace is an open-source project. We strongly believe in transparency, collaboration, and sharing knowledge within the GitHub community. Our source code is available on GitHub, and we encourage everyone to contribute, submit improvement suggestions, and participate in the platform's evolution. Join us in our commitment to open-source!",
  },
  {
    question: "How can I contribute to GitshareSpace?",
    answer:
      "You can contribute to GitshareSpace by submitting pull requests, reporting issues, and suggesting improvements. We welcome contributions from everyone, regardless of their experience level. We believe that diversity and inclusion are essential to the success of our platform, and we are committed to providing a welcoming and supportive environment for all contributors.",
  },
  // More questions...
];

export const Faqs = () => {
  return (
    <section id="faqs" className="bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-white/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-white">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-white/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <PlusSmallIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-300">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
