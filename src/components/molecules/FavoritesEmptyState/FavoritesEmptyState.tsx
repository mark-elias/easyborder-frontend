// src/components/molecules/FavoritesEmptyState/FavoritesEmptyState.tsx
export function FavoritesEmptyState() {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-3">
        <p className="text-xl font-semibold">No favorites yet</p>
        <p className="text-custom-grey">
          Click the heart icon on a wait time card to save it here.
        </p>
      </div>
    );
  }