export function calculateDueDate(item) {
  const today = new Date();

  // If manual mode
  if (!item.is_auto) {
    return item.manual_due_date;
  }

  // YEARLY (Income Tax)
  if (item.frequency === "yearly") {
    let year = today.getFullYear();
    let due = new Date(year, item.rule_month - 1, item.rule_day);

    if (today > due) {
      due = new Date(year + 1, item.rule_month - 1, item.rule_day);
    }

    return due;
  }

  // MONTHLY (GST)
  if (item.frequency === "monthly") {
    let year = today.getFullYear();
    let month = today.getMonth();
    let due = new Date(year, month, item.rule_day);

    if (today > due) {
      due = new Date(year, month + 1, item.rule_day);
    }

    return due;
  }

  return null;
}
