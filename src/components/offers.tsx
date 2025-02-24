import { AnimatedSection } from "./animated-section";

export function Offers() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">
            Special Offers
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Offer 1 */}
          <AnimatedSection className="bg-secondary rounded-lg overflow-hidden shadow-lg">
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Early Bird Discount"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Early Bird Discount</h3>
              <p className="text-gray-600 mb-4">
                Book 60 days in advance and save up to 20% on your stay.
              </p>
              <a
                href="#"
                className="text-primary-light font-semibold hover:underline"
              >
                Learn More
              </a>
            </div>
          </AnimatedSection>

          {/* Offer 2 */}
          <AnimatedSection className="bg-secondary rounded-lg overflow-hidden shadow-lg">
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Family Package"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Family Package</h3>
              <p className="text-gray-600 mb-4">
                Enjoy special rates and activities for the whole family.
              </p>
              <a
                href="#"
                className="text-primary-light font-semibold hover:underline"
              >
                Learn More
              </a>
            </div>
          </AnimatedSection>

          {/* Offer 3 */}
          <AnimatedSection className="bg-secondary rounded-lg overflow-hidden shadow-lg">
            <img
              src="/placeholder.svg?height=200&width=400"
              alt="Romantic Getaway"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Romantic Getaway</h3>
              <p className="text-gray-600 mb-4">
                Surprise your loved one with our special romantic package.
              </p>
              <a
                href="#"
                className="text-primary-light font-semibold hover:underline"
              >
                Learn More
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
