import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Shirt, BarChart3, Plus, CreditCard as Edit, Trash2, X, Save } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { dbHelpers } from '../../lib/supabase';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [fashionItems, setFashionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const { user } = useAuth();

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    subcategory: '',
    color: '',
    season: '',
    occasion: '',
    body_type: [],
    weather: [],
    price: '',
    brand: '',
    description: '',
    image_url: ''
  });

  useEffect(() => {
    loadData();
    
    // Listen for refresh events
    const handleRefresh = () => {
      console.log('Refreshing admin data due to external event');
      loadData();
    };
    
    window.addEventListener('refreshAdminData', handleRefresh);
    
    return () => {
      window.removeEventListener('refreshAdminData', handleRefresh);
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    console.log('Loading admin dashboard data...');
    try {
      console.log('Current user:', user?.email);
      
      const [usersData, conversationsData, itemsData] = await Promise.all([
        dbHelpers.getAllUsers(),
        dbHelpers.getAllConversations(),
        dbHelpers.getFashionItems()
      ]);

      console.log('Admin data loaded:', {
        users: usersData.data?.length || 0,
        conversations: conversationsData.data?.length || 0,
        items: itemsData.data?.length || 0
      });
      
      if (usersData.error) {
        console.error('Users data error:', usersData.error);
      }
      if (conversationsData.error) {
        console.error('Conversations data error:', conversationsData.error);
      }
      if (itemsData.error) {
        console.error('Fashion items data error:', itemsData.error);
      }

      if (usersData.data) setUsers(usersData.data);
      if (conversationsData.data) setConversations(conversationsData.data);
      if (itemsData.data) setFashionItems(itemsData.data);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async () => {
    try {
      const itemData = {
        ...newItem,
        price: parseFloat(newItem.price) || 0,
        body_type: newItem.body_type.length > 0 ? newItem.body_type : ['all'],
        weather: newItem.weather.length > 0 ? newItem.weather : ['all']
      };

      const { error } = await dbHelpers.addFashionItem(itemData);
      if (!error) {
        setShowAddItem(false);
        setNewItem({
          name: '', category: '', subcategory: '', color: '', season: '', occasion: '',
          body_type: [], weather: [], price: '', brand: '', description: '', image_url: ''
        });
        loadData();
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const { error } = await dbHelpers.deleteFashionItem(id);
      if (!error) {
        loadData();
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 size={20} /> },
    { id: 'users', label: 'Users', icon: <Users size={20} /> },
    { id: 'conversations', label: 'Conversations', icon: <MessageSquare size={20} /> },
    { id: 'fashion-items', label: 'Fashion Items', icon: <Shirt size={20} /> },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="text-center mt-4">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full h-[90vh] overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-pink-500 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-xl">
            <p className="text-sm text-white/80">Logged in as:</p>
            <p className="font-semibold">{user?.email}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h3>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-pink-100">Total Users</p>
                      <p className="text-3xl font-bold">{users.length}</p>
                    </div>
                    <Users size={40} className="text-pink-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Conversations</p>
                      <p className="text-3xl font-bold">{conversations.length}</p>
                    </div>
                    <MessageSquare size={40} className="text-purple-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-teal-100">Fashion Items</p>
                      <p className="text-3xl font-bold">{fashionItems.length}</p>
                    </div>
                    <Shirt size={40} className="text-teal-200" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h4 className="text-lg font-semibold mb-4">Recent Users</h4>
                  <div className="space-y-3">
                    {users.slice(0, 5).map((user: any) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                  <h4 className="text-lg font-semibold mb-4">Recent Conversations</h4>
                  <div className="space-y-3">
                    {conversations.slice(0, 5).map((conv: any) => (
                      <div key={conv.id} className="border-l-4 border-pink-500 pl-3">
                        <p className="text-sm font-medium">{conv.users?.full_name || 'Anonymous'}</p>
                        <p className="text-xs text-gray-500 truncate">{conv.message}</p>
                        <p className="text-xs text-gray-400">{new Date(conv.created_at).toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">User Management</h3>
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user: any) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {user.full_name?.charAt(0) || 'U'}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{user.full_name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'conversations' && (
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">User Conversations</h3>
              
              <div className="space-y-4">
                {conversations.map((conv: any) => (
                  <div key={conv.id} className="bg-white p-6 rounded-2xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {(conv.users?.full_name || conv.user_full_name)?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium">{conv.users?.full_name || conv.user_full_name || 'Anonymous'}</p>
                          <p className="text-sm text-gray-500">{conv.users?.email || conv.user_email || 'No email'}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(conv.created_at).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-700">User Message:</p>
                        <p className="text-gray-600">{conv.message}</p>
                      </div>
                      
                      <div className="bg-pink-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-pink-700">AI Response:</p>
                        <p className="text-gray-600">{conv.response}</p>
                      </div>
                      
                      {conv.recommendations && conv.recommendations.length > 0 && (
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-purple-700">Recommendations:</p>
                          <div className="mt-2 space-y-1">
                            {conv.recommendations.map((rec: any, index: number) => (
                              <div key={index} className="text-sm text-gray-600">
                                <strong>{rec.category}:</strong> {rec.items?.map((item: any) => `${item.type}: ${item.item}`).join(', ')}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'fashion-items' && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Fashion Items</h3>
                <button
                  onClick={() => setShowAddItem(true)}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:from-pink-600 hover:to-purple-700 transition-all"
                >
                  <Plus size={20} />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fashionItems.map((item: any) => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    
                    <h4 className="text-lg font-semibold mb-2">{item.name}</h4>
                    <div className="space-y-1 text-sm text-gray-600 mb-4">
                      <p><strong>Category:</strong> {item.category}</p>
                      <p><strong>Color:</strong> {item.color}</p>
                      <p><strong>Season:</strong> {item.season}</p>
                      <p><strong>Occasion:</strong> {item.occasion}</p>
                      <p><strong>Price:</strong> ${item.price}</p>
                      <p><strong>Brand:</strong> {item.brand}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Add New Fashion Item</h3>
              <button
                onClick={() => setShowAddItem(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Item Name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="tops">Tops</option>
                <option value="bottoms">Bottoms</option>
                <option value="dresses">Dresses</option>
                <option value="outerwear">Outerwear</option>
                <option value="shoes">Shoes</option>
                <option value="accessories">Accessories</option>
              </select>

              <input
                type="text"
                placeholder="Subcategory"
                value={newItem.subcategory}
                onChange={(e) => setNewItem({...newItem, subcategory: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />

              <input
                type="text"
                placeholder="Color"
                value={newItem.color}
                onChange={(e) => setNewItem({...newItem, color: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />

              <select
                value={newItem.season}
                onChange={(e) => setNewItem({...newItem, season: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Select Season</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
                <option value="all">All Seasons</option>
              </select>

              <select
                value={newItem.occasion}
                onChange={(e) => setNewItem({...newItem, occasion: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Select Occasion</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="party">Party</option>
                <option value="workout">Workout</option>
                <option value="date">Date</option>
              </select>

              <input
                type="number"
                placeholder="Price"
                value={newItem.price}
                onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />

              <input
                type="text"
                placeholder="Brand"
                value={newItem.brand}
                onChange={(e) => setNewItem({...newItem, brand: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />

              <input
                type="url"
                placeholder="Image URL"
                value={newItem.image_url}
                onChange={(e) => setNewItem({...newItem, image_url: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent md:col-span-2"
              />

              <textarea
                placeholder="Description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent md:col-span-2"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowAddItem(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all flex items-center space-x-2"
              >
                <Save size={16} />
                <span>Add Item</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;