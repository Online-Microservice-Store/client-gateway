import { Injectable } from '@nestjs/common';
import { Counter, Registry, collectDefaultMetrics } from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly registry: Registry;
  public readonly requestCounter: Counter<string>;

  constructor() {
    // Inicializar el Registry
    this.registry = new Registry();

    // Crear un contador para las solicitudes HTTP
    this.requestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['endpoint', 'method', 'status_code'],
    });

    // Registrar las métricas predeterminadas (como el uso de la memoria, CPU, etc.)
    collectDefaultMetrics({ register: this.registry });

    // Registrar el contador de solicitudes HTTP
    this.registry.registerMetric(this.requestCounter);
  }

  // Método para incrementar el contador de solicitudes
  incrementRequestCounter(endpoint: string, method: string, statusCode: string) {
    this.requestCounter.inc({ endpoint, method, status_code: statusCode });
  }

  // Método para obtener las métricas expuestas
  getMetrics() {
    return this.registry.metrics();  // Exponer las métricas en formato adecuado para Prometheus
  }
}
