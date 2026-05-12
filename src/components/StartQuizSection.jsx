import { Link } from "react-router";

export default function StartQuizSection() {
  return (
    <section className="py-12 px-2 md:px-8">
      <div
        id="StartQuizSection"
        className="p-10 h-100 rounded-lg flex items-center w-full"
      >
        <div className="lg:w-1/2 ">
          <p className="text-white-70 font-bold text-xs mb-5">
            PERSONALIZED REGIMEN
          </p>
          <h3 className="text-white text-5xl font-bold mb-5">
            Mirror of Science
          </h3>
          <p className="font-normal text-lg mb-3 text-white-80">
            Data is the foundation of beauty. Take our advanced Skin Quiz to
            find your personalized clinical regimen tailored to your unique
            microbiome.
          </p>
          <Link to='/profile/survey'>
            <button className="bg-[#FBF9F7] cursor-pointer py-4 px-10 rounded-sm text-sm font-bold text-[#272727]">
              START SKIN QUIZ
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
