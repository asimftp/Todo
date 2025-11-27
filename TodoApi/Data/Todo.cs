using System;
using System.Collections.Generic;

namespace TodoApi.Data;

public partial class Todo
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public bool IsCompleted { get; set; }

    public DateTime? DueDate { get; set; }
}
