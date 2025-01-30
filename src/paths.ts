const paths = {
  home() {
    return "/";
  },
  categoryShow(categorySlug: string) {
    return `/categories/${categorySlug}`;
  },
  locationCreate(categorySlug: string) {
    return `/categories/${categorySlug}/locations/new`;
  },
  locationShow(categorySlug: string, locationId: string) {
    return `/categories/${categorySlug}/locations/${locationId}`;
  },
  // locationEdit() {},
  // locationDelete() {},
  // search() {},
  // about() {},
};

export default paths;
