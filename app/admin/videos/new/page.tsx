import VideoForm from '@/components/admin/VideoForm';

export default function NewVideoPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <a href="/admin" className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center gap-1 mb-4">
          <i className="ri-arrow-left-line"></i>
          Retour au dashboard
        </a>
        <h1 className="text-2xl font-bold text-white">Nouvelle vidéo</h1>
        <p className="text-gray-400 text-sm mt-1">Ajoutez une vidéo YouTube à votre portfolio</p>
      </div>

      <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
        <VideoForm />
      </div>
    </div>
  );
}
