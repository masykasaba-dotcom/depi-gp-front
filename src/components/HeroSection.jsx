import HeroImage from "../assets/Hero-photo.png";

export default function HeroSection() {
  return (
    <section className="grid lg:grid-cols-2 gap-10 items-center py-18 px-2 md:px-8 bg-base-100">
      <div className="w-4/5">
        <p className="text-primary font-normal text-sm pb-3 uppercase tracking-widest ">
          DERMATOLOGICAL PRECISION
        </p>

        <h3 className="text-base-content text-7xl font-normal mb-4 font-serif">
          The Clinical
        </h3>

        <span className="text-base-content text-7xl font-normal mb-4 block font-serif">
          Curator
        </span>

        <p className="text-base-content/70 text-xl font-normal mb-4 w-2/3">
          High-fidelity skincare formulated with precision and backed by the
          rigorous standards of modern dermatological science.
        </p>

        <div className="flex gap-5 flex-wrap items-center">
          <button className="btn btn-neutral px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] rounded-xl">
            SHOP THE COLLECTION
          </button>

          <button className="text-base-content/60 text-sm font-normal border-b border-base-300 p-1 hover:text-primary transition">
            OUR PHILOSOPHY
          </button>
        </div>
      </div>

      <div>
        <img
          src={HeroImage}
          className="block rounded-lg w-full lg:w-fit ms-auto h-180 object-fill opacity-90"
          alt=""
        />
      </div>
    </section>
  );
}
