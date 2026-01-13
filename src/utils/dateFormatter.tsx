export const formatDate = (dateString: string | Date ) => {
    if (!dateString) return 'Non défini';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return String(dateString);

    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};