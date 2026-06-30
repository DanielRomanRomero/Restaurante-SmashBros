export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-surface-container-high border-t-primary-container rounded-full animate-spin" />
    </div>
  )
}
