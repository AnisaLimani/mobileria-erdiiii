import React, { useCallback, useEffect, useState } from 'react';
import { API_URL, SITE_BASE_URL, UPLOADS_BASE_URL } from '../config';

const Admin = () => {
  // =========================================
  // PRODUCTS
  // =========================================

  const [products, setProducts] = useState([]);

  // =========================================
  // CATEGORIES
  // =========================================

  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // =========================================
  // PROJECTS
  // =========================================

  const [projects, setProjects] = useState([]);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    tags: '',
    image: ''
  });

  const [selectedProjectFile, setSelectedProjectFile] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // =========================================
  // ADMIN / LOGIN
  // =========================================

  const [isOwner, setIsOwner] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // =========================================
  // GENERAL
  // =========================================

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('products');

  // Success / error alert
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  // Information popup
  const [showInfo, setShowInfo] = useState(false);

  // Confirm popup
  const [confirmPopup, setConfirmPopup] = useState({
    show: false,
    title: '',
    message: '',
    type: '',
    id: null
  });

  // =========================================
  // SHOW MESSAGE
  // =========================================

  const showMessage = useCallback((text, type = 'success') => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage('');
    }, 3000);
  }, []);

  // =========================================
  // CHECK OWNER SESSION
  // =========================================
  const checkOwnerSession = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/login.php`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );

      if (!response.ok) {
        // 401 këtu thjesht do të thotë që nuk je i kyçur.
        // Nuk është error që duhet shfaqur në console.
        setIsOwner(false);
        return;
      }

      const data = await response.json();

      if (data.success) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }

    } catch (error) {
      console.error('Session check failed:', error);
      setIsOwner(false);
    }
  }, []);

  // =========================================
  // LOGIN
  // =========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoginError('');

    if (!loginPassword.trim()) {
      setLoginError(
        'Ju lutem shkruani fjalëkalimin.'
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/login.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            password: loginPassword
          }),
          credentials: 'include'
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setIsOwner(true);
        setLoginPassword('');
        setLoginError('');
      } else {
        setLoginError(
          data.message ||
            data.error ||
            'Fjalëkalim i gabuar.'
        );
      }
    } catch (error) {
      console.error(
        'Login error:',
        error
      );

      setLoginError(
        'Nuk mund të lidheni me serverin.'
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = async () => {
    setConfirmPopup({
      show: true,
      title: 'Dil nga Admin Panel',
      message:
        'A jeni i sigurt që dëshironi të dilni nga paneli?',
      type: 'logout',
      id: null
    });
  };

  const performLogout = async () => {
    try {
      await fetch(
        `${API_URL}/logout.php`,
        {
          method: 'POST',
          credentials: 'include'
        }
      );
    } catch (error) {
      console.error(
        'Logout failed:',
        error
      );
    }

    setIsOwner(false);
    setLoginPassword('');
    setConfirmPopup({
      show: false,
      title: '',
      message: '',
      type: '',
      id: null
    });
  };

  // =========================================
// FETCH PRODUCTS
// =========================================

const fetchProducts = useCallback(async () => {
  try {
    const response = await fetch(
      `${API_URL}/get_products.php`
    );

    if (!response.ok) {
      throw new Error(
        'API responded with status ' + response.status
      );
    }

    const data = await response.json();

    if (Array.isArray(data)) {
      setProducts(data);
    } else {
      console.error(
        'Invalid products response:',
        data
      );
    }
  } catch (error) {
    console.error(
      'Error fetching products:',
      error
    );

    showMessage(
      'Nuk mund të ngarkohen produktet.',
      'error'
    );
  }
}, [showMessage]);

  // =========================================
  // FETCH PRODUCTS
  // =========================================

const fetchCategories = useCallback(async () => {
    try {
        const response = await fetch(
            `${API_URL}/get_categories.php`,
            {
                credentials: 'include'
            }
        );

        if (!response.ok) {
            throw new Error(
                'API responded with status ' + response.status
            );
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.categories)) {
            setCategories(data.categories);
        } else {
            console.error(
                'Invalid categories response:',
                data
            );
        }

    } catch (error) {
        console.error(
            'Error fetching categories:',
            error
        );

        showMessage(
            'Nuk mund të ngarkohen kategoritë.',
            'error'
        );
    }
}, [showMessage]);
  // =========================================
  // ADD CATEGORY
  // =========================================

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const name = newCategory.trim();

    if (!name) {
      showMessage('Shkruani emrin e kategorisë.', 'error');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/add_category.php`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name }),
          credentials: 'include'
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setNewCategory('');
        await fetchCategories();
        showMessage('Kategoria u shtua me sukses! ✓');
      } else {
        showMessage(
          data.error || 'Gabim gjatë shtimit të kategorisë.',
          'error'
        );
      }
    } catch (error) {
      console.error('Add category error:', error);
      showMessage(
        'Gabim gjatë shtimit të kategorisë.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // DELETE CATEGORY - CONFIRM
  // =========================================

  const handleCategoryDelete = (category) => {
    const usedCount = products.filter(
      (product) => product.category === category.name
    ).length;

    if (usedCount > 0) {
      showMessage(
        `Nuk mund të fshihet "${category.name}" sepse ka ${usedCount} produkt${usedCount === 1 ? '' : 'e'} në këtë kategori.`,
        'error'
      );
      return;
    }

    setConfirmPopup({
      show: true,
      title: 'Fshi kategorinë',
      message: `A jeni i sigurt që dëshironi ta fshini kategorinë "${category.name}"?`,
      type: 'category',
      id: category.id
    });
  };

  // =========================================
  // FETCH PROJECTS
  // =========================================

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_URL}/get_projects.php`
      );

      if (!response.ok) {
        throw new Error(
          'API responded with status ' +
            response.status
        );
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setProjects(data);
      } else {
        console.error(
          'Invalid projects response:',
          data
        );
      }
    } catch (error) {
      console.error(
        'Error fetching projects:',
        error
      );

      showMessage(
        'Nuk mund të ngarkohen projektet.',
        'error'
      );
    }
  }, [showMessage]);

  // =========================================
  // INITIAL LOAD
  // =========================================

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchProjects();
    checkOwnerSession();
  }, [checkOwnerSession, fetchCategories, fetchProducts, fetchProjects]);

  // =========================================
  // PRODUCT INPUT
  // =========================================

  const handleInputChange = (e) => {
    const {
      name,
      value
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // =========================================
  // PROJECT INPUT
  // =========================================

  const handleProjectInputChange = (e) => {
    const {
      name,
      value
    } = e.target;

    setProjectForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // =========================================
  // PRODUCT FILE
  // =========================================

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      showMessage(
        'Ju lutem zgjidhni një foto.',
        'error'
      );

      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage(
        'Fotoja nuk duhet të jetë më e madhe se 5MB.',
        'error'
      );

      e.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  // =========================================
  // PROJECT FILE
  // =========================================

  const handleProjectFileSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      showMessage(
        'Ju lutem zgjidhni një foto.',
        'error'
      );

      e.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage(
        'Fotoja nuk duhet të jetë më e madhe se 5MB.',
        'error'
      );

      e.target.value = '';
      return;
    }

    setSelectedProjectFile(file);
  };

  // =========================================
  // UPLOAD IMAGE
  // =========================================

  const uploadImage = async (file) => {
    const formDataUpload =
      new FormData();

    formDataUpload.append(
      'image',
      file
    );

    try {
      const response = await fetch(
        `${API_URL}/upload_image.php`,
        {
          method: 'POST',
          body: formDataUpload,
          credentials: 'include'
        }
      );

      const data =
        await response.json();

      if (data.success) {
        return data.filename;
      }

      showMessage(
        data.error ||
          'Gabim gjatë upload-it të fotos.',
        'error'
      );

      return null;
    } catch (error) {
      console.error(
        'Upload error:',
        error
      );

      showMessage(
        'Gabim gjatë upload-it të fotos.',
        'error'
      );

      return null;
    }
  };

  // =========================================
  // SAVE PRODUCT
  // =========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      let imageName =
        formData.image;

      if (
        imageName &&
        imageName.startsWith('http')
      ) {
        const parts =
          imageName.split('/');

        imageName =
          parts[parts.length - 1];
      }

      if (selectedFile) {
        imageName =
          await uploadImage(
            selectedFile
          );

        if (!imageName) {
          setLoading(false);
          return;
        }
      }

      const payload = {
        name: formData.name,
        description:
          formData.description,
        category:
          formData.category,
        image: imageName
      };

      let url =
        `${API_URL}/add_product.php`;

      let method = 'POST';

      if (editingId) {
        url =
          `${API_URL}/update_product.php`;

        method = 'PUT';

        payload.id = editingId;
      }

      const response =
        await fetch(url, {
          method,
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify(
            payload
          ),
          credentials: 'include'
        });

      const data =
        await response.json();

      if (
        response.ok &&
        data.success
      ) {
        showMessage(
          editingId
            ? 'Produkti u përditësua me sukses! ✓'
            : 'Produkti u shtua me sukses! ✓'
        );

        resetProductForm();

        await fetchProducts();
      } else {
        showMessage(
          data.error ||
            'Gabim gjatë ruajtjes së produktit.',
          'error'
        );
      }
    } catch (error) {
      console.error(
        'Error saving product:',
        error
      );

      showMessage(
        'Gabim gjatë ruajtjes së produktit.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // SAVE PROJECT
  // =========================================

  const handleProjectSubmit =
    async (e) => {
      e.preventDefault();

      setLoading(true);

      try {
        let imageName =
          projectForm.image;

        if (
          imageName &&
          imageName.startsWith('http')
        ) {
          const parts =
            imageName.split('/');

          imageName =
            parts[parts.length - 1];
        }

        if (selectedProjectFile) {
          imageName =
            await uploadImage(
              selectedProjectFile
            );

          if (!imageName) {
            setLoading(false);
            return;
          }
        }

        const payload = {
          title:
            projectForm.title,
          description:
            projectForm.description,

          tags: projectForm.tags
            ? projectForm.tags
                .split(',')
                .map((tag) =>
                  tag.trim()
                )
                .filter(Boolean)
            : [],

          image: imageName
        };

        let url =
          `${API_URL}/add_project.php`;

        let method = 'POST';

        if (editingProjectId) {
          url =
            `${API_URL}/update_project.php`;

          method = 'PUT';

          payload.id =
            editingProjectId;
        }

        const response =
          await fetch(url, {
            method,
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify(
              payload
            ),
            credentials: 'include'
          });

        const data =
          await response.json();

        if (
          response.ok &&
          data.success
        ) {
          showMessage(
            editingProjectId
              ? 'Projekti u përditësua me sukses! ✓'
              : 'Projekti u shtua me sukses! ✓'
          );

          resetProjectForm();

          await fetchProjects();
        } else {
          showMessage(
            data.error ||
              'Gabim gjatë ruajtjes së projektit.',
            'error'
          );
        }
      } catch (error) {
        console.error(
          'Error saving project:',
          error
        );

        showMessage(
          'Gabim gjatë ruajtjes së projektit.',
          'error'
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================================
  // EDIT PRODUCT
  // =========================================

  const handleEdit = (product) => {
    setFormData({
      name:
        product.name || '',
      description:
        product.description || '',
      category:
        product.category || '',
      image:
        product.image || ''
    });

    setSelectedFile(null);

    setEditingId(
      product.id
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // =========================================
  // EDIT PROJECT
  // =========================================

  const handleProjectEdit = (
    project
  ) => {
    setProjectForm({
      title:
        project.title || '',

      description:
        project.description || '',

      tags: Array.isArray(
        project.tags
      )
        ? project.tags.join(', ')
        : project.tags || '',

      image:
        project.image || ''
    });

    setSelectedProjectFile(
      null
    );

    setEditingProjectId(
      project.id
    );

    setActiveTab(
      'projects'
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // =========================================
  // DELETE PRODUCT - CONFIRM
  // =========================================

  const handleDelete = (id) => {
    setConfirmPopup({
      show: true,
      title: 'Fshi produktin',
      message:
        'A jeni i sigurt që dëshironi ta fshini këtë produkt? Ky veprim nuk mund të zhbëhet.',
      type: 'product',
      id
    });
  };

  // =========================================
  // DELETE PROJECT - CONFIRM
  // =========================================

  const handleProjectDelete = (
    id
  ) => {
    setConfirmPopup({
      show: true,
      title: 'Fshi projektin',
      message:
        'A jeni i sigurt që dëshironi ta fshini këtë projekt? Ky veprim nuk mund të zhbëhet.',
      type: 'project',
      id
    });
  };

  // =========================================
  // CONFIRM ACTION
  // =========================================

  const confirmAction = async () => {
    const {
      type,
      id
    } = confirmPopup;

    if (type === 'logout') {
      await performLogout();
      return;
    }

    setConfirmPopup({
      show: false,
      title: '',
      message: '',
      type: '',
      id: null
    });

    try {
      let endpoint = '';

      if (type === 'product') {
        endpoint =
          `${API_URL}/delete_product.php`;
      }

      if (type === 'project') {
        endpoint =
          `${API_URL}/delete_project.php`;
      }

      if (type === 'category') {
        endpoint =
          `${API_URL}/delete_category.php`;
      }

      const response =
        await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify({
            id
          }),
          credentials: 'include'
        });

      const data =
        await response.json();

      if (
        response.ok &&
        data.success
      ) {
        if (
          type === 'product'
        ) {
          showMessage(
            'Produkti u fshi me sukses! ✓'
          );

          await fetchProducts();
        }

        if (
          type === 'project'
        ) {
          showMessage(
            'Projekti u fshi me sukses! ✓'
          );

          await fetchProjects();
        }

        if (
          type === 'category'
        ) {
          showMessage(
            'Kategoria u fshi me sukses! ✓'
          );

          await fetchCategories();
        }
      } else {
        showMessage(
          data.error ||
            'Gabim gjatë fshirjes.',
          'error'
        );
      }
    } catch (error) {
      console.error(
        'Delete error:',
        error
      );

      showMessage(
        'Gabim gjatë fshirjes.',
        'error'
      );
    }
  };

  // =========================================
  // RESET PRODUCT FORM
  // =========================================

  const resetProductForm =
    () => {
      setFormData({
        name: '',
        description: '',
        category: '',
        image: ''
      });

      setSelectedFile(
        null
      );

      setEditingId(null);
    };

  // =========================================
  // RESET PROJECT FORM
  // =========================================

  const resetProjectForm =
    () => {
      setProjectForm({
        title: '',
        description: '',
        tags: '',
        image: ''
      });

      setSelectedProjectFile(
        null
      );

      setEditingProjectId(
        null
      );
    };

  // =========================================
  // LOGIN SCREEN
  // =========================================

  if (!isOwner) {
    return (
<div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 -translate-y-20">
          <div className="w-full max-w-md">

          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">

            <div className="text-center mb-8">

              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🔐
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                Admin Panel
              </h1>

              <p className="text-slate-500 mt-2">
                Hyni për të menaxhuar
                faqen
              </p>

            </div>


            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Fjalëkalimi
                </label>

                <input
                  type="password"
                  value={
                    loginPassword
                  }
                  onChange={(e) =>
                    setLoginPassword(
                      e.target.value
                    )
                  }
                  placeholder="Shkruani fjalëkalimin"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent"
                />

              </div>


              {loginError && (

                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  ⚠️ {loginError}
                </div>

              )}


              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-700 text-white py-3 rounded-xl font-semibold hover:bg-amber-800 transition disabled:bg-slate-400"
              >
                {loading
                  ? 'Duke kontrolluar...'
                  : 'Hyr në Admin'}
              </button>

            </form>

          </div>

        </div>

      </div>
    );
  }

  // =========================================
  // ADMIN PANEL
  // =========================================

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-16">

      {/* =====================================
          SUCCESS / ERROR MESSAGE
      ===================================== */}

      {message && (

        <div
          className={`fixed top-24 right-5 z-[100] max-w-sm px-5 py-4 rounded-xl shadow-xl border flex items-center gap-3 ${
            messageType ===
            'error'
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-green-50 border-green-200 text-green-700'
          }`}
        >

          <span className="text-xl">
            {messageType ===
            'error'
              ? '⚠️'
              : '✓'}
          </span>

          <span className="font-medium">
            {message}
          </span>

        </div>

      )}


      <div className="container mx-auto px-4 py-8">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

          <div>

            <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">
              Management
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              🔧 Admin Panel
            </h1>

          </div>


          <div className="flex gap-3">

            {/* INFO BUTTON */}

            <button
              onClick={() =>
                setShowInfo(true)
              }
              className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-100 transition font-medium shadow-sm"
            >
              ℹ️ Informata
            </button>


            {/* LOGOUT */}

            <button
              onClick={
                handleLogout
              }
              className="px-4 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition font-medium shadow-sm"
            >
              Dil
            </button>

          </div>

        </div>


        {/* =====================================
            TABS
        ===================================== */}

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-2 mb-8 inline-flex gap-2">

          <button
            onClick={() =>
              setActiveTab(
                'products'
              )
            }
            className={`px-5 py-2.5 rounded-lg font-medium transition ${
              activeTab ===
              'products'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            📦 Produkte
          </button>


          <button
            onClick={() =>
              setActiveTab(
                'categories'
              )
            }
            className={`px-5 py-2.5 rounded-lg font-medium transition ${
              activeTab ===
              'categories'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🏷️ Kategoritë
          </button>

          <button
            onClick={() =>
              setActiveTab(
                'projects'
              )
            }
            className={`px-5 py-2.5 rounded-lg font-medium transition ${
              activeTab ===
              'projects'
                ? 'bg-amber-700 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🖼️ Projektet
          </button>

        </div>


        {/* =====================================
            PRODUCTS
        ===================================== */}

        {activeTab ===
        'products' ? (

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* PRODUCT FORM */}

            <div className="lg:col-span-1">

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

                <h2 className="text-xl font-bold text-slate-900 mb-6">

                  {editingId
                    ? '✏️ Ndrysho Produktin'
                    : '➕ Shto Produkt'}

                </h2>


                <form
                  onSubmit={
                    handleSubmit
                  }
                  className="space-y-5"
                >

                  {/* NAME */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Emri
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={
                        formData.name
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Kuzhinë Moderne"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />

                  </div>


                  {/* DESCRIPTION */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Përshkrimi
                    </label>

                    <textarea
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Përshkrimi i produktit..."
                      required
                      rows="4"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                    />

                  </div>


                  {/* CATEGORY */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Kategoria
                    </label>

                    <select
                      name="category"
                      value={
                        formData.category
                      }
                      onChange={
                        handleInputChange
                      }
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 bg-white"
                    >

                      <option value="">
                        Zgjedh kategorinë
                      </option>

                      {categories.map(
                        (
                          category
                        ) => (

                          <option
                            key={
                              category.id
                            }
                            value={
                              category.name
                            }
                          >
                            {
                              category.name
                            }
                          </option>

                        )
                      )}

                    </select>

                  </div>


                  {/* IMAGE */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Foto
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleFileSelect
                      }
                      className="w-full text-sm border border-slate-300 rounded-xl p-2"
                    />

                    {selectedFile && (

                      <div className="mt-3">

                        <p className="text-sm text-green-600 mb-2">
                          ✓{' '}
                          {
                            selectedFile.name
                          }
                        </p>

                        <img
                          src={URL.createObjectURL(
                            selectedFile
                          )}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-xl"
                        />

                      </div>

                    )}

                  </div>


                  {/* BUTTONS */}

                  <div className="flex gap-2">

                    <button
                      type="submit"
                      disabled={
                        loading
                      }
                      className="flex-1 bg-amber-700 text-white py-3 rounded-xl font-semibold hover:bg-amber-800 transition disabled:bg-slate-400"
                    >
                      {loading
                        ? 'Duke ruajtur...'
                        : editingId
                        ? 'Përditëso'
                        : 'Shto'}
                    </button>


                    {editingId && (

                      <button
                        type="button"
                        onClick={
                          resetProductForm
                        }
                        className="px-5 bg-slate-400 text-white rounded-xl hover:bg-slate-500 transition"
                      >
                        Anulo
                      </button>

                    )}

                  </div>

                </form>

              </div>

            </div>


            {/* PRODUCTS LIST */}

            <div className="lg:col-span-2">

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold text-slate-900">
                    📦 Produktet
                  </h2>

                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {products.length}
                  </span>

                </div>


                <div className="space-y-3 max-h-[600px] overflow-y-auto">

                  {products.length ===
                  0 ? (

                    <div className="text-center py-12 text-slate-400">
                      Nuk ka produkte akoma.
                    </div>

                  ) : (

                    products.map(
                      (
                        product
                      ) => (

                        <div
                          key={
                            product.id
                          }
                          className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition"
                        >

                          <div className="flex gap-4">

                            {product.image && (

                              <img
                                src={
                                  product.image.startsWith('http')
                                    ? product.image
                                    : product.image.startsWith('/')
                                      ? `${SITE_BASE_URL}${product.image}`
                                      : `${UPLOADS_BASE_URL}/${product.image}`
                                }
                                alt={
                                  product.name
                                }
                                className="w-20 h-20 object-cover rounded-lg"
                              />

                            )}


                            <div className="flex-1 min-w-0">

                              <h3 className="font-bold text-slate-800">
                                {
                                  product.name
                                }
                              </h3>

                              <p className="text-sm text-slate-500 line-clamp-2 mt-1">
                                {
                                  product.description
                                }
                              </p>

                              <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                                {
                                  product.category
                                }
                              </span>

                            </div>


                            <div className="flex gap-2">

                              <button
                                onClick={() =>
                                  handleEdit(
                                    product
                                  )
                                }
                                className="w-9 h-9 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                              >
                                ✏️
                              </button>

                              <button
                                onClick={() =>
                                  handleDelete(
                                    product.id
                                  )
                                }
                                className="w-9 h-9 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                              >
                                🗑️
                              </button>

                            </div>

                          </div>

                        </div>

                      )
                    )

                  )}

                </div>

              </div>

            </div>

          </div>

        ) : activeTab ===
        'categories' ? (
          /* =====================================
             CATEGORIES
          ===================================== */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  🏷️ Shto Kategori
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  Kategoritë ruhen direkt në databazë. Produktet ekzistuese nuk preken.
                </p>

                <form onSubmit={handleAddCategory} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Emri i kategorisë
                    </label>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="p.sh. Dhoma Gjumi"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-amber-700 text-white py-3 rounded-xl font-semibold hover:bg-amber-800 transition disabled:bg-slate-400"
                  >
                    {loading ? 'Duke ruajtur...' : '➕ Shto Kategorinë'}
                  </button>
                </form>

                <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-100">
                  <p className="text-sm text-amber-800">
                    <strong>⚠️ Kujdes:</strong> Kategoria nuk lejohet të fshihet nëse ka produkte që e përdorin. Kjo mbron produktet që i ke vendosur tash.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      🏷️ Kategoritë
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Kategoritë aktuale nga databaza
                    </p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {categories.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {categories.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                      Nuk ka kategori akoma.
                    </div>
                  ) : (
                    categories.map((category) => {
                      const usedCount = products.filter(
                        (product) => product.category === category.name
                      ).length;

                      return (
                        <div
                          key={category.id}
                          className="border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4 hover:shadow-md transition"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl">
                              🏷️
                            </div>
                            <div className="min-w-0">
                              <h3 className="font-bold text-slate-800 truncate">
                                {category.name}
                              </h3>
                              <p className="text-sm text-slate-500 mt-1">
                                {usedCount} produkt{usedCount === 1 ? '' : 'e'}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCategoryDelete(category)}
                            disabled={usedCount > 0}
                            title={usedCount > 0 ? 'Kjo kategori përdoret nga produkte' : 'Fshi kategorinë'}
                            className={`w-10 h-10 rounded-lg text-white transition ${
                              usedCount > 0
                                ? 'bg-slate-300 cursor-not-allowed'
                                : 'bg-red-500 hover:bg-red-600'
                            }`}
                          >
                            🗑️
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* =====================================
             PROJECTS
          ===================================== */

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* PROJECT FORM */}

            <div className="lg:col-span-1">

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

                <h2 className="text-xl font-bold text-slate-900 mb-6">

                  {editingProjectId
                    ? '✏️ Ndrysho Projektin'
                    : '➕ Shto Projekt'}

                </h2>


                <form
                  onSubmit={
                    handleProjectSubmit
                  }
                  className="space-y-5"
                >

                  {/* TITLE */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Titulli
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={
                        projectForm.title
                      }
                      onChange={
                        handleProjectInputChange
                      }
                      placeholder="Emri i projektit"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />

                  </div>


                  {/* DESCRIPTION */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Përshkrimi
                    </label>

                    <textarea
                      name="description"
                      value={
                        projectForm.description
                      }
                      onChange={
                        handleProjectInputChange
                      }
                      placeholder="Përshkrimi i projektit..."
                      rows="4"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600 resize-none"
                    />

                  </div>


                  {/* TAGS */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Etiketat
                    </label>

                    <input
                      type="text"
                      name="tags"
                      value={
                        projectForm.tags
                      }
                      onChange={
                        handleProjectInputChange
                      }
                      placeholder="Kuzhina, Minimalizëm"
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-600"
                    />

                    <p className="text-xs text-slate-400 mt-1">
                      Ndaji me presje.
                    </p>

                  </div>


                  {/* IMAGE */}

                  <div>

                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Foto
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleProjectFileSelect
                      }
                      className="w-full text-sm border border-slate-300 rounded-xl p-2"
                    />

                    {selectedProjectFile && (

                      <div className="mt-3">

                        <p className="text-sm text-green-600 mb-2">
                          ✓{' '}
                          {
                            selectedProjectFile.name
                          }
                        </p>

                        <img
                          src={URL.createObjectURL(
                            selectedProjectFile
                          )}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-xl"
                        />

                      </div>

                    )}

                  </div>


                  {/* BUTTONS */}

                  <div className="flex gap-2">

                    <button
                      type="submit"
                      disabled={
                        loading
                      }
                      className="flex-1 bg-amber-700 text-white py-3 rounded-xl font-semibold hover:bg-amber-800 transition disabled:bg-slate-400"
                    >
                      {loading
                        ? 'Duke ruajtur...'
                        : editingProjectId
                        ? 'Përditëso'
                        : 'Shto'}
                    </button>


                    {editingProjectId && (

                      <button
                        type="button"
                        onClick={
                          resetProjectForm
                        }
                        className="px-5 bg-slate-400 text-white rounded-xl hover:bg-slate-500 transition"
                      >
                        Anulo
                      </button>

                    )}

                  </div>

                </form>

              </div>

            </div>


            {/* PROJECT LIST */}

            <div className="lg:col-span-2">

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold text-slate-900">
                    🖼️ Projektet
                  </h2>

                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {projects.length}
                  </span>

                </div>


                <div className="space-y-3 max-h-[600px] overflow-y-auto">

                  {projects.length ===
                  0 ? (

                    <div className="text-center py-12 text-slate-400">
                      Nuk ka projekte akoma.
                    </div>

                  ) : (

                    projects.map(
                      (project) => (

                        <div
                          key={
                            project.id
                          }
                          className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition"
                        >

                          <div className="flex gap-4">

                            {project.image && (

                              <img
                                src={
                                  project.image.startsWith('http')
                                    ? project.image
                                    : project.image.startsWith('/')
                                      ? `${SITE_BASE_URL}${project.image}`
                                      : `${UPLOADS_BASE_URL}/${project.image}`
                                }
                                alt={
                                  project.title
                                }
                                className="w-24 h-20 object-cover rounded-lg"
                              />

                            )}


                            <div className="flex-1 min-w-0">

                              <h3 className="font-bold text-slate-800">
                                {
                                  project.title
                                }
                              </h3>

                              <p className="text-sm text-slate-500 line-clamp-2 mt-1">
                                {
                                  project.description
                                }
                              </p>


                              <div className="flex flex-wrap gap-1 mt-2">

                                {Array.isArray(
                                  project.tags
                                ) &&
                                  project.tags.map(
                                    (
                                      tag,
                                      index
                                    ) => (

                                      <span
                                        key={
                                          index
                                        }
                                        className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                                      >
                                        {
                                          tag
                                        }
                                      </span>

                                    )
                                  )}

                              </div>

                            </div>


                            <div className="flex gap-2">

                              <button
                                onClick={() =>
                                  handleProjectEdit(
                                    project
                                  )
                                }
                                className="w-9 h-9 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                              >
                                ✏️
                              </button>

                              <button
                                onClick={() =>
                                  handleProjectDelete(
                                    project.id
                                  )
                                }
                                className="w-9 h-9 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                              >
                                🗑️
                              </button>

                            </div>

                          </div>

                        </div>

                      )
                    )

                  )}

                </div>

              </div>

            </div>

          </div>

        )}

      </div>


      {/* =====================================
          INFORMATION POPUP
      ===================================== */}

      {showInfo && (

        <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

            <div className="p-6 border-b border-slate-200 flex items-center justify-between">

              <div>

                <h2 className="text-xl font-bold text-slate-900">
                  ℹ️ Informata për Admin
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Menaxhimi i faqes
                </p>

              </div>

              <button
                onClick={() =>
                  setShowInfo(false)
                }
                className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
              >
                ✕
              </button>

            </div>


            <div className="p-6 space-y-4">

              <div className="flex gap-3">

                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  📦
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    Produktet
                  </h3>

                  <p className="text-sm text-slate-500">
                    Shtoni, ndryshoni ose
                    fshini produktet e
                    mobilerisë.
                  </p>

                </div>

              </div>


              <div className="flex gap-3">

                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  🖼️
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    Projektet
                  </h3>

                  <p className="text-sm text-slate-500">
                    Menaxhoni projektet,
                    përshkrimet, etiketat
                    dhe fotografitë.
                  </p>

                </div>

              </div>


              <div className="flex gap-3">

                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  📸
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    Fotografitë
                  </h3>

                  <p className="text-sm text-slate-500">
                    Fotografitë ngarkohen
                    direkt në server dhe
                    shfaqen në faqe.
                  </p>

                </div>

              </div>


              <div className="flex gap-3">

                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  ✏️
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    Editimi
                  </h3>

                  <p className="text-sm text-slate-500">
                    Përdorni butonin ✏️
                    për të ndryshuar
                    informacionet.
                  </p>

                </div>

              </div>

            </div>


            <div className="p-6 bg-slate-50 border-t border-slate-200">

              <button
                onClick={() =>
                  setShowInfo(false)
                }
                className="w-full bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
              >
                Mbyll
              </button>

            </div>

          </div>

        </div>

      )}


      {/* =====================================
          CONFIRM POPUP
      ===================================== */}

      {confirmPopup.show && (

        <div className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">

            <div className="p-6">

              <div className="flex items-center gap-4 mb-5">

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    confirmPopup.type ===
                    'logout'
                      ? 'bg-slate-100'
                      : 'bg-red-100'
                  }`}
                >
                  {confirmPopup.type ===
                  'logout'
                    ? '🚪'
                    : '🗑️'}
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    {
                      confirmPopup.title
                    }
                  </h2>

                </div>

              </div>


              <p className="text-slate-600 leading-relaxed">
                {
                  confirmPopup.message
                }
              </p>

            </div>


            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">

              <button
                onClick={() =>
                  setConfirmPopup({
                    show: false,
                    title: '',
                    message: '',
                    type: '',
                    id: null
                  })
                }
                className="flex-1 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition"
              >
                Anulo
              </button>


              <button
                onClick={
                  confirmAction
                }
                className={`flex-1 py-3 rounded-xl text-white font-semibold transition ${
                  confirmPopup.type ===
                  'logout'
                    ? 'bg-slate-800 hover:bg-slate-900'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {confirmPopup.type ===
                'logout'
                  ? 'Dil'
                  : 'Po, Fshi'}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Admin;