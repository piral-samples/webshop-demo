class Firebase {
  createAccount = (email, password) => Promise.resolve();

  signIn = (email, password) => Promise.resolve();

  signOut = () => Promise.resolve();

  passwordReset = (email) => Promise.resolve();

  addUser = (id, user) => Promise.resolve();

  getUser = (id) => Promise.resolve({});

  passwordUpdate = (password) => Promise.resolve();

  changePassword = (currentPassword, newPassword) =>
    Promise.resolve("Password updated successfully!");

  reauthenticate = (currentPassword) => Promise.resolve();

  updateEmail = (currentPassword, newEmail) =>
    Promise.resolve("Email Successfully updated");

  updateProfile = (id, updates) => Promise.resolve();

  saveBasketItems = (items) => Promise.resolve();

  getSingleProduct = (id) => Promise.resolve({});

  getProducts = (lastRefKey) =>
    Promise.resolve({ products: [], lastKey: null, total: 0 });

  searchProducts = (searchKey) =>
    Promise.resolve({ products: [], lastKey: null });

  getFeaturedProducts = (itemsCount = 12) => Promise.resolve([]);

  getRecommendedProducts = (itemsCount = 12) => Promise.resolve([]);

  addProduct = (id, product) => Promise.resolve();

  generateKey = () => Math.random().toString(26);

  storeImage = async (id, folder, imageFile) => Promise.resolve("");

  deleteImage = (id) => Promise.resolve();

  editProduct = (id, updates) => Promise.resolve();

  removeProduct = (id) => Promise.resolve();
}

const firebaseInstance = new Firebase();

export default firebaseInstance;
