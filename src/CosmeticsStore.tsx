import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Heart, Star, Plus, Minus, X, CreditCard, Truck, Shield } from 'lucide-react';

const CosmeticsStore = () => {
  const [currentPage, setCurrentPage] = useState('catalog');
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'card'
  });

  const categories = [
    { id: 'all', name: 'Все товары' },
    { id: 'face', name: 'Уход за лицом' },
    { id: 'eyes', name: 'Для глаз' },
    { id: 'lips', name: 'Для губ' },
    { id: 'body', name: 'Для тела' }
  ];

  const products = [
    {
      id: 1,
      name: 'Увлажняющий крем для лица',
      price: 2500,
      category: 'face',
      image: '🧴',
      rating: 4.8,
      reviews: 156,
      description: 'Интенсивное увлажнение для всех типов кожи. Содержит гиалуроновую кислоту и витамин E.',
      inStock: true
    },
    {
      id: 2,
      name: 'Тушь для ресниц',
      price: 1800,
      category: 'eyes',
      image: '💄',
      rating: 4.6,
      reviews: 89,
      description: 'Удлиняющая тушь с эффектом объема. Водостойкая формула.',
      inStock: true
    },
    {
      id: 3,
      name: 'Помада матовая',
      price: 1200,
      category: 'lips',
      image: '💋',
      rating: 4.9,
      reviews: 203,
      description: 'Стойкая матовая помада с насыщенным цветом. Не сушит губы.',
      inStock: true
    },
    {
      id: 4,
      name: 'Лосьон для тела',
      price: 1500,
      category: 'body',
      image: '🧴',
      rating: 4.7,
      reviews: 124,
      description: 'Питательный лосьон с маслом ши и экстрактом алоэ вера.',
      inStock: false
    },
    {
      id: 5,
      name: 'Сыворотка с витамином C',
      price: 3200,
      category: 'face',
      image: '💊',
      rating: 4.9,
      reviews: 187,
      description: 'Антиоксидантная сыворотка для сияния кожи. Осветляет пигментные пятна.',
      inStock: true
    },
    {
      id: 6,
      name: 'Подводка для глаз',
      price: 950,
      category: 'eyes',
      image: '✏️',
      rating: 4.5,
      reviews: 92,
      description: 'Водостойкая подводка с тонким аппликатором для точных линий.',
      inStock: true
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleOrderSubmit = () => {
    if (!orderForm.name || !orderForm.email || !orderForm.phone || !orderForm.address) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    alert('Заказ оформлен! Спасибо за покупку!');
    setCart([]);
    setCurrentPage('catalog');
    setOrderForm({ name: '', email: '', phone: '', address: '', paymentMethod: 'card' });
  };

  const Header = () => (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-green-600 cursor-pointer"
              onClick={() => setCurrentPage('catalog')}>
            EcoBeauty
          </h1>
          <nav className="hidden md:flex space-x-6">
            <button 
              onClick={() => setCurrentPage('catalog')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'catalog' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:text-green-600'
              }`}
            >
              Каталог
            </button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2 text-gray-600 hover:text-green-600">
            <User className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentPage('cart')}
            className="relative p-2 text-gray-600 hover:text-green-600"
          >
            <ShoppingCart className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
          <span className="text-6xl">{product.image}</span>
        </div>
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Нет в наличии
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
          <span className="ml-2 text-sm text-gray-500">({product.reviews} отзывов)</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">{product.price} ₽</span>
          <button
            onClick={() => product.inStock && addToCart(product)}
            disabled={!product.inStock}
            className={`px-4 py-2 rounded-lg transition-colors ${
              product.inStock
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );

  const Catalog = () => (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold mb-4">Категории</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-green-100 text-green-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </aside>
        <main className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {categories.find(c => c.id === selectedCategory)?.name || 'Все товары'}
            </h2>
            <p className="text-gray-600">Найдено товаров: {filteredProducts.length}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );

  const Cart = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Корзина</h2>
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Ваша корзина пуста</p>
          <button
            onClick={() => setCurrentPage('catalog')}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            Перейти к покупкам
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-emerald-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-2xl">{item.image}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">{item.price} ₽</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="ml-4 font-semibold">
                {item.price * item.quantity} ₽
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Итого:</span>
              <span className="text-2xl font-bold text-green-600">{getTotalPrice()} ₽</span>
            </div>
            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const Checkout = () => (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Оформление заказа</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Контактная информация</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Имя и фамилия"
                  required
                  value={orderForm.name}
                  onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={orderForm.email}
                  onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  required
                  value={orderForm.phone}
                  onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                  placeholder="Адрес доставки"
                  required
                  value={orderForm.address}
                  onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-20 resize-none"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold mb-4">Способ оплаты</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={orderForm.paymentMethod === 'card'}
                    onChange={(e) => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                    className="mr-2"
                  />
                  <CreditCard className="w-5 h-5 mr-2" />
                  Банковская карта
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={orderForm.paymentMethod === 'cash'}
                    onChange={(e) => setOrderForm({...orderForm, paymentMethod: e.target.value})}
                    className="mr-2"
                  />
                  <Truck className="w-5 h-5 mr-2" />
                  Наличными при получении
                </label>
              </div>
            </div>
            
            <button
              onClick={handleOrderSubmit}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Подтвердить заказ
            </button>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold mb-4">Ваш заказ</h3>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.name} x{item.quantity}</span>
                  <span>{item.price * item.quantity} ₽</span>
                </div>
              ))}
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>Бесплатно</span>
                </div>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого:</span>
                  <span className="text-green-600">{getTotalPrice()} ₽</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            <div className="flex items-center mb-3">
              <Shield className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm">Безопасная оплата</span>
            </div>
            <div className="flex items-center mb-3">
              <Truck className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm">Бесплатная доставка от 2000 ₽</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm">Гарантия качества</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-green-50">
      <Header />
      {currentPage === 'catalog' && <Catalog />}
      {currentPage === 'cart' && <Cart />}
      {currentPage === 'checkout' && <Checkout />}
    </div>
  );
};

export default CosmeticsStore;