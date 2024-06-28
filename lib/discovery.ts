// The key should match the component name in the library

export const ComponentExpressionList = {
  Nginx: "nginx_up",
  PostgreSQL: "pg_up == 0",
  Kubernetes: "kube_node_status_condition",
  Clickhouse: "clickhouse_up",
  Elasticsearch: "elasticsearch_node_stats_up",
};
