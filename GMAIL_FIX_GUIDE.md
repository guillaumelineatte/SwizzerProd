# 🔧 Guide complet - Résolution erreur Gmail EmailJS

## ❌ Problème :
```
412 Gmail_API: Request had insufficient authentication scopes.
```

## ✅ Solution étape par étape :

### **Étape 1 : Supprimer et recréer le service Gmail**
1. Allez sur [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. **Email Services** → Trouvez votre service Gmail
3. Cliquez sur **"Delete"** pour supprimer le service actuel
4. Cliquez sur **"Add New Service"**
5. Choisissez **"Gmail"**

### **Étape 2 : Configuration Gmail avec les bonnes permissions**
1. **Connectez-vous avec votre Gmail**
2. **IMPORTANT** : Cliquez sur **"Advanced"** ou **"Show more"**
3. **Autorisez TOUTES les permissions** :
   - ✅ Send emails
   - ✅ Read emails
   - ✅ Manage email settings
   - ✅ Access to Gmail API
4. Cliquez sur **"Allow"** pour toutes les permissions

### **Étape 3 : Vérifier la configuration**
1. Notez le **nouveau Service ID** (différent de l'ancien)
2. Mettez à jour votre `.env.local` avec le nouveau Service ID
3. Testez le formulaire

### **Étape 4 : Alternative si ça ne marche toujours pas**
Si le problème persiste, utilisez **Outlook** au lieu de Gmail :
1. **Add New Service** → **Outlook**
2. Connectez-vous avec votre compte Outlook
3. Plus simple, moins de problèmes d'authentification

## 🚀 Solution immédiate - Formspree :
Si vous voulez une solution immédiate sans problème, je peux configurer Formspree qui est plus simple.

**Voulez-vous que je vous guide pour recréer le service Gmail ou préférez-vous que je configure Formspree ?**
