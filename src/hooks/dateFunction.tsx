export const dateFunction = (
  release_date: string | undefined
): string | undefined => {
  if (release_date) {
    const event: Date = new Date(release_date);
    const date: string[] = event.toString().slice(4, 15).split(" ");
    const month: string = date[0];
    const day: string = date[1];
    const year: string = date[2];
    return `${day} ${month} ${year}`;
  }
};
