import CustomInput from "../components/CustomInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
import useGetProfileData from "../hooks/useGetProfileData";
import RecommendationsProducts from "../components/RecommendationsProducts";

export default function Profile() {
  const { isError, isLoading, profileData } = useGetProfileData();

  if (isLoading) {
    return (
      <section className="bg-base-100  py-12">
        <div className="animate-pulse mx-auto max-w-3xl px-4 md:px-8 ">
          <header className="mb-10 border-b border-base-300 pb-6">
            <h1 className="font-serif text-3xl font-light text-base-content md:text-4xl">
              My Profile
            </h1>
            <p className="mt-2 text-base-content/70">
              Manage your personal information and preferences.
            </p>
          </header>
          {/* HEADER */}

          {/* PROFILE OVERVIEW CARD */}
          <div className="rounded-2xl border border-base-300 bg-base-200/40 p-6 md:p-8 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar Skeleton */}
              <div className="w-24 h-24 rounded-full bg-base-300"></div>

              {/* Text Skeleton */}
              <div className="flex flex-col items-center md:items-start gap-3 w-full">
                <div className="h-6 w-40 bg-base-300 rounded"></div>
                <div className="h-4 w-56 bg-base-300 rounded"></div>
                <div className="h-5 w-28 bg-base-300 rounded-full mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-sm text-gray-500 mt-6">
        Something went wrong while loading your data. Try refreshing the page.
      </div>
    );
  }
  return (
    <>
      {!isLoading && !isError && (
        <section className="bg-base-100 py-12">
          <div className="mx-auto max-w-3xl px-4 md:px-8">
            <header className="mb-10 border-b border-base-300 pb-6">
              <h1 className="font-serif text-3xl font-light text-base-content md:text-4xl">
                My Profile
              </h1>
              <p className="mt-2 text-base-content/70">
                Manage your personal information and preferences.
              </p>
            </header>

            {/* PROFILE OVERVIEW CARD */}
            <div className="rounded-2xl border border-base-300 bg-base-200/40 p-6 md:p-8 shadow-sm mb-12">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-base-300 flex items-center justify-center text-3xl font-serif text-base-content/50 border border-base-300 uppercase">
                  {profileData?.first_name?.[0]}
                  {profileData?.last_name?.[0]}
                </div>

                {/* Info */}
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-semibold text-base-content">
                    {profileData?.first_name} {profileData?.last_name}
                  </h2>

                  <p className="text-base-content/70 mt-1">
                    {profileData?.email}
                  </p>

                  <p className="text-base-content/60 text-sm mt-1">
                    {profileData?.phone}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                    <span className="badge badge-outline badge-sm text-xs py-2 px-3 tracking-wider">
                      {profileData?.loyalty_points} Points
                    </span>

                    <span className="badge badge-ghost badge-sm text-xs py-2 px-3">
                      Joined{" "}
                      {new Date(profileData?.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <RecommendationsProducts/>
        </section>
      )}
    </>
  );
}
